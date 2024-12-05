import React, {lazy, Suspense, useCallback, useEffect, useMemo, useState, startTransition} from 'react';
import {Alert, Button, Col, Form, Row, Spinner} from 'react-bootstrap';
import {ref, uploadBytes, uploadString} from 'firebase/storage';
import {auth, config, database, sendPushoverNotification, storage} from '../../firebase';
import {getIdTokenResult, signOut} from 'firebase/auth';
import {fetchAndActivate, getValue} from 'firebase/remote-config';
import {useTranslation} from 'react-i18next';
import useNavigate from "../../components/LanguageWrapper/Navigation";
import {getImageDimensions, handleAuthorTest, setUids} from "./articleData/articleData";
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';
import ImageUploader from 'quill-image-uploader';
import ReactQuill from "react-quill";
import ImageUpload from "./components/fancyImage/ImageUpload";
import CategoryDropdown from "./components/CategoryDropdown/CategoryDropdown";
import {get, ref as databaseRef} from "firebase/database";


const ArticleUpload = () => {
    const { t, i18n } = useTranslation();
    const [articleContent, setArticleContent] = useState('');
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [language, setLanguage] = useState('');
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [category, setCategory] = useState('');
    const [sponsor, setSponsor] = useState('');
    const [socials, setSocials] = useState({
        facebook: '',
        instagram: '',
        spotify: '',
        youtube: ''
    });

    const [adminUids, setAdminUids] = useState([]);
    const [leadersUids, setLeadersUids] = useState([]);

    const categories = useMemo(() => [
        "Top News",
        "General News",
        "Interviews",
        "Collabs and Sponsorships",
        "Latest Reviews(ENG)",
        "Latest Reviews(GRE)",
        "Legends"
    ], []);

    const navigate = useNavigate();

    useEffect(() => {

        const rolesRef = databaseRef(database, '/roles');
        get(rolesRef).then(async (snapshot) => {
            const roles = snapshot.val();
            const userList = roles.admin || [];
            const leaderList = roles.authorLeader || [];
            setUids(userList, leaderList, setAdminUids, setLeadersUids).then();
        });




        try {
            fetchAndActivate(config).then(() => {
                const serverLanguages = getValue(config, "languages").asString();
                setAvailableLanguages(JSON.parse(serverLanguages));
            });
        } catch (err) {
            console.log(err);
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            handleAuthorTest(user, setCurrentUser, navigate);
        });

        return () => unsubscribe();
    }, []);



    const replaceSpecialCharsWithDashes = useCallback((text) => {
        // Replace all characters that are not letters, digits, or spaces with a dash
        const regex = /[^\p{L}\p{N} ]/gu;
        return text.replace(regex, '-').replace(/-+/g, '-');
    }, []);


    const sendNotification = (userId)=>{
        sendPushoverNotification({
            uid: userId,
            title: `Article uploaded`,
            message: `A new article was uploaded by ${currentUser.displayName} and is now ready for review by you.`,
            url:"https://pulse-of-the-underground.com/upload/admin"
        }).then((result) => {
            const data = result.data;
            if (data.success) {
                console.log("Notification sent successfully:", data.message);
            } else {
                console.error("Error sending notification:", data.message);
            }
        })
    }


    const handleArticleSubmit = async (e) => {
        e.preventDefault();

        try {
            const nameWithoutJSON = replaceSpecialCharsWithDashes(title.replaceAll(" ", "-"));
            const newFileName = `${nameWithoutJSON}.json`;
            const imageRef = ref(storage, `images/${nameWithoutJSON}`);
            const dimensions = await getImageDimensions(image);
            const metadata = {
                customMetadata: dimensions
            };
            await uploadBytes(imageRef, image, metadata);

            console.log(metadata);

            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            };

            const articleData = {
                content: articleContent.replaceAll("<p>", "<p class='lead'>").replaceAll("<img", "<img class='img-fluid'"),
                title,
                details,
                socials,
                img01: `https://pulse-of-the-underground.com/assets/${nameWithoutJSON}`,
                sub: currentUser.uid,
                date: new Date().toLocaleDateString('en-GB', options),
                lang: language, // Store language as English
                translations: {},
                category,
                sponsor,
                authorApproved:true
            };

            articleData.translations[language] = newFileName;

            const articleDataRef = ref(storage, `upload_from_authors/${newFileName}`);
            await uploadString(articleDataRef, JSON.stringify(articleData));

            setArticleContent('');
            setTitle('');
            setDetails('');
            setSocials({
                facebook: '',
                instagram: '',
                spotify: '',
                youtube: ''
            });
            setImage(null);

            setSubmitSuccess(true);
            setSubmitError(null);
            setCategory("");


            leadersUids.forEach((uid)=>{
                try {
                    sendNotification(uid);
                }catch(e){
                    console.log(e)
                }
            })
            adminUids.forEach(uid => {
                try {
                    sendNotification(uid);
                }catch(e){
                    console.log(e)
                }
            })


        } catch (error) {
            console.error('Error submitting article:', error.message);
            setSubmitError('Error submitting article. Please try again.\n' + error.message);
            setSubmitSuccess(false);
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <h2 className="h2 text-white">{t('authorUploadSystem')}</h2>
                <hr className="bg-dark" />
                <Form className="card w-100 bg-dark p-5" onSubmit={handleArticleSubmit}>
                    <Suspense fallback={<Spinner animation="border" variant="light" />}>
                        <Form.Group controlId="articleContent">
                            <Form.Label className="text-light">{t('pasteArticleContent')}</Form.Label>
                            <ReactQuill
                                theme="snow"
                                className="text-light"
                                value={articleContent}
                                onChange={(value) => {
                                    startTransition(() => {
                                        const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
                                        setArticleContent(sanitizedValue);
                                    });
                                }}
                                modules={{
                                    toolbar: {
                                        container: [
                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                            [{ size: [] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                            ['link', 'image'],
                                            ['clean']
                                        ],
                                        handlers: {
                                            'image': ImageUploader.handler
                                        }
                                    }
                                }}
                            />
                        </Form.Group>
                    </Suspense>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label className="text-light">{t('title')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className={"bg-dark text-light"}
                                    value={title}
                                    onChange={(e) => startTransition(() => setTitle(e.target.value))}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="details">
                                <Form.Label className="text-light">{t('details')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    className={"bg-dark text-light"}
                                    value={details}
                                    onChange={(e) => startTransition(() => setDetails(e.target.value))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="socials">
                        <Form.Label className="text-light">{t('socialMediaLinks')}</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('facebook')}
                                    className={"bg-dark text-light"}
                                    value={socials.facebook}
                                    onChange={(e) => startTransition(() => setSocials({ ...socials, facebook: e.target.value }))}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('instagram')}
                                    className={"bg-dark text-light"}
                                    value={socials.instagram}
                                    onChange={(e) => startTransition(() => setSocials({ ...socials, instagram: e.target.value }))}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('spotify')}
                                    className={"bg-dark text-light"}
                                    value={socials.spotify}
                                    onChange={(e) => startTransition(() => setSocials({ ...socials, spotify: e.target.value }))}
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={t('youtube')}
                                    className={"bg-dark text-light"}
                                    value={socials.youtube}
                                    onChange={(e) => startTransition(() => setSocials({ ...socials, youtube: e.target.value }))}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="originalLanguage">
                        <Row className="d-flex align-items-center">
                            <Col>
                                <Form.Label className="text-light">{t('language')}</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={language}
                                    className={"form-control bg-dark text-light"}
                                    onChange={(e) => {
                                        startTransition(() => {
                                            setLanguage(e.target.value);
                                        });
                                    }}
                                    required={true}
                                >
                                    <option value="">{t('selectLanguage')}</option>
                                    {Object.keys(availableLanguages).map((langCode) => {
                                        return (
                                            <option value={langCode} key={langCode}>
                                                {availableLanguages[langCode]}
                                            </option>
                                        );
                                    })}
                                </Form.Control>
                            </Col>
                            <Row className={"col-6 d-flex justify-content-evenly"}>
                                <Col className="">
                                    <CategoryDropdown
                                        categories={categories}
                                        onSelectCategory={(category) => startTransition(() => setCategory(category))}
                                        required={true}
                                        name={"Select a Category"}
                                    />
                                </Col>
                            </Row>
                        </Row>
                    </Form.Group>
                    <Suspense fallback={<Spinner animation="border" variant="light" />}>
                        <Form.Group controlId="image">
                            <ImageUpload setImage={setImage} image={image} />
                        </Form.Group>
                    </Suspense>

                    <Button variant="primary" type="submit">
                        {t('uploadArticle')}
                    </Button>

                    {submitSuccess && (
                        <Alert variant="success" className="mt-3">
                            {t('articleSubmittedSuccessfully')}
                        </Alert>
                    )}
                    {submitError && (
                        <Alert variant="danger" className="mt-3">
                            {submitError}
                        </Alert>
                    )}
                </Form>
            </div>
        </div>
    );
};

export default ArticleUpload;
