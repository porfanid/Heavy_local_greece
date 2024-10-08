import {deleteObject, getDownloadURL, ref as storageRef, uploadString} from 'firebase/storage';
import {child, get, orderByChild, query, ref as databaseRef, remove, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Form, ListGroup, Modal, Row, Toast} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./form-control.css";
import {
    auth,
    database,
    generateRecording,
    handlePublishFunction,
    isDev,
    sendPushoverNotification,
    storage
} from '../../../firebase';
import {signOut} from "firebase/auth";
import CategoryDropdown from "../components/CategoryDropdown/CategoryDropdown";
import {categories, deleteImage, fetchFiles, getRef, handleAuthorTest, setUids} from "../articleData/articleData";
import useNavigate from "../../../components/LanguageWrapper/Navigation";
import {httpsCallable} from "firebase/functions";


const FirebaseFileList = () => {


    const [files, setFiles] = useState([]);
    const [alreadyPublishedArticles, setAlreadyPublishedArticles] = useState([]);
    const [earlyReleasedArticles, setEarlyReleasedArticles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [sortByDate, setSortByDate] = useState(false);
    const [sortByCategory, setSortByCategory] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [translatorName, setTranslatorName] = useState('');
    const [socials, setSocials] = useState({});
    const [isAuthor, setIsAuthor] = useState(false);
    const [fileData, setFileData] = useState({
        content: '',
        title: '',
        details: '',
        Socials: '',
        img01: '',
        sub: '',
        date: '',
        lang: '',
        translations: {},
        isReady: false,
        sponsor: ""
    });
    const [error, setError] = useState('');
    const [alreadyPublishedError, setAlreadyPublishedError] = useState('');
    const [earlyReleasesError, setEarlyReleasesError] = useState('');
    const [leader, setIsLeader] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [contentChanged, setContentChanged] = useState(false);

    const [adminUids, setAdminUids] = useState([]);
    const [leadersUids, setLeadersUids] = useState([]);






    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            handleAuthorTest(user, (user) => {
            }, navigate);
        });
        const rolesRef = databaseRef(database, '/roles');
        get(rolesRef).then(async (snapshot) => {
            const roles = snapshot.val();
            const userList = roles.admin || [];
            const leaderList = roles.authorLeader || [];


            setUids(userList, leaderList, setAdminUids, setLeadersUids  );

            auth.onAuthStateChanged((user) => {
                setUser(user);

                if (user && user.email === "pavlos@orfanidis.net.gr") {
                    console.log("test 12");
                } else {
                    handleAuthorTest(user, (user) => {
                    }, navigate);
                    console.log("Test15")
                }

                console.log("Test31666");

                if (user) {
                    setIsLeader(leaderList.includes(user.email) && !userList.includes(user.email));
                    setIsAuthor(!leaderList.includes(user.email) && !userList.includes(user.email))
                } else {
                    navigate('/upload');
                    signOut(auth).then();
                }
            });
        });

        fetchFiles((files) => {
            console.log(files);
            setFiles(files["upload_from_authors"]);
            setEarlyReleasedArticles(!files["early_releases"] ? [] : files["early_releases"]);
            setAlreadyPublishedArticles(files["articles"])
        }, setError, setAlreadyPublishedArticles, setAlreadyPublishedError, setEarlyReleasedArticles, setEarlyReleasesError, setLoading).then();
    }, []);

    const copyLinkToClipboard = (link) => {
        navigator.clipboard.writeText(link).then(() => {
            setShowToast(true);
        });
    }

    const handleEdit = async (file, isAlreadyPub, isEarlyReleased) => {
        file.data = {
            isEarlyAccess: isEarlyReleased,
            isPublished: isAlreadyPub,
        };
        console.log(file)

        const articleRef = storageRef(storage, `${file.folder}/${file.name}.json`);
        const articleDownloadLink = await getDownloadURL(articleRef);
        const articleDataString = await fetch(articleDownloadLink);
        const fileData = await articleDataString.json();

        setSelectedFile(file);
        setFileData(fileData);
        setSocials(fileData.socials || {});

        fetchAuthorAndTranslatorNames(fileData.sub, fileData.translatedBy).then();
        setShowModal(true);
    };

    const fetchAuthorAndTranslatorNames = async (authorId, translatorId) => {
        const authorRef = databaseRef(database, `authors/${authorId}`);
        const translatorRef = databaseRef(database, `authors/${translatorId}`);

        try {
            const [authorSnapshot, translatorSnapshot] = await Promise.all([
                get(authorRef),
                get(translatorRef),
            ]);

            setAuthorName(authorSnapshot.exists() ? authorSnapshot.val().displayName || '' : '');
            setTranslatorName(translatorSnapshot.exists() ? translatorSnapshot.val().displayName || '' : '');
        } catch (error) {
            console.error('Error fetching author and translator names:', error);
            setAuthorName('');
            setTranslatorName('');
        }
    };

    const handleSave = async () => {
        if(contentChanged){
            setContentChanged(false);
            console.log("Updating recording");
            const filePath = `${selectedFile.folder}/${selectedFile.name}.json`;
            generateRecording({filePath}).then();
        }
        if (!selectedFile || !fileData) return;
        const author = fileData.translatedBy || fileData.sub;
        try {
            const fileRef = storageRef(storage, `${selectedFile.folder}/${selectedFile.name}.json`);
            console.log(`${selectedFile.folder}/${selectedFile.name}`)
            const updatedContent = fileData.content.replaceAll('<p>', "<p class='lead'>").replaceAll('<img', "<img class='img-fluid'");
            console.log("fileData", fileData);
            await uploadString(fileRef, JSON.stringify({...fileData, content: updatedContent, authorApproved: (user.uid===author)}));

            setAuthorName('');
            setSocials({});
            setShowModal(false);

            if(leader) {
                sendNotification(fileData.sub)
            }

            if(!leader){
                leadersUids.forEach((uid)=>{
                    sendNotification(uid);
                })
            }

            adminUids.forEach(uid => {
                sendNotification(uid);
            })

            alert('Changes saved successfully!');
        } catch (error) {
            setError('Error saving file data: ' + error.message);
        }
    };

    const sendNotification = (userId)=>{
        sendPushoverNotification({
            uid: userId,
            title: `Article edited`,
            message: `Your article was edited by ${user.displayName} and is now ready for review by you.`,
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

    const handleChange = (e, field, isObject) => {
        let {value} = e.target;

        if (field === 'category' || field === 'sub' || field === 'translatedBy') {
            if (field === 'category') {
                fileData.category = value;
            }

            const oldCategory = fileData.category;
            const articleRef = databaseRef(database, `articles/${fileData.category}/${selectedFile.name.replace('.json', '')}`);
            const data = selectedFile.data;

            update(articleRef, data);

            let folder;

            if (data.isEarlyAccess) {
                folder = 'early_releases';
            } else if (data.isPublished) {
                folder = 'articles';
            } else {
                folder = 'upload_from_authors';
            }

            const author = fileData.translatedBy || fileData.sub;
            const authorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(authorRef);

            const newAuthorRef = databaseRef(database, `authors/${author}/writtenArticles/${folder}/${fileData.category}/`);
            update(newAuthorRef, {[selectedFile.name.replace('.json', '')]: true});

            const oldArticleRef = databaseRef(database, `articles/${oldCategory}/${selectedFile.name.replace('.json', '')}`);
            remove(oldArticleRef);
        }

        if (isObject) {
            value = JSON.parse(value);
        }
        setFileData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleContentChange = (value) => {
        setContentChanged(true);
        const sanitizedValue = value.replace(/<[^>]*style="[^"]*color:\s*[^";]*;?[^"]*"[^>]*>/g, '');
        setFileData((prevData) => ({
            ...prevData,
            content: sanitizedValue,
        }));
    };

    const handleSocialChange = (field, value) => {
        let {value: fieldValue} = value.target;
        setSocials((prevData) => ({
            ...prevData,
            [field]: fieldValue,
        }));

        const updatedSocials = {
            ...socials,
            [field]: fieldValue,
        };

        handleChange({target: {value: JSON.stringify(updatedSocials) || '{}'}}, 'socials', true);
    };

    const handleDelete = async (file, isAlreadyPub, isEarlyReleased) => {
        const articleRef = storageRef(storage, `${file.folder}/${file.name}.json`);
        const articleDownloadLink = await getDownloadURL(articleRef);
        const articleDataString = await fetch(articleDownloadLink);
        const fileData = await articleDataString.json();

        const isConfirmed = window.confirm(`Are you sure you want to delete the file "${file.name}"?`);
        if (!isConfirmed) return;

        try {
            const fileRef = storageRef(storage, `${file.folder}/${file.name}.json`);

            if (fileData.translations && Object.keys(fileData.translations).length < 2) {
                const image = getRef(fileData.img01, false)
                deleteImage(image);
                console.log("The image was deleted", image);
            }
            console.log("deleteImage: ", `${file.folder}/${file.name}.json`);

            await deleteObject(fileRef);
            console.log("The article was deleted successfully");
        } catch (error) {
            console.log(error)
            setError('Error deleting file: ' + error.message + " " + JSON.stringify(file));
        }
    };

    const handlePublish = async (to_normal_release, file, isEarlyReleasedArticles) => {
        const fileName = file.name;
        try {
            const result = await handlePublishFunction({ to_normal_release, fileName, isEarlyReleasedArticles });
            console.log(result.data.message);
            alert(result.data.message);
        } catch (error) {
            console.error('Error publishing file:', error);
            alert('Error publishing file: ' + error.message);
        }
    };


    const handleShowList = (files, isAlreadyPublished, isEarlyReleased) => {

        console.log(files)
        let sortedList = !files ? [] : [...files];

// Sorting logic based on sortByCategory
        if (sortByCategory) {
            sortedList.sort((a, b) => {
                const categoryA = a.category || 'Uncategorized';
                const categoryB = b.category || 'Uncategorized';
                return categoryA.localeCompare(categoryB);
            });

// Grouping by category
            const groupedByCategory = sortedList.reduce((acc, article) => {
                const category = article.category || 'Uncategorized';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(article);
                return acc;
            }, {});

            return (
                <>
                    {Object.entries(groupedByCategory).map(([category, articles]) => (
                        <div key={category}>
                            <h5 className="text-white">{category}</h5>
                            {renderCategoryCards(articles)}
                        </div>
                    ))}
                </>
            );
        }

// Sorting logic based on sortByDate
        if (sortByDate) {
            sortedList.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateB - dateA;
            });
        }

// Render articles in cards
        return (
            <div className="row">
                {sortedList.map((file, index) => (
                    renderArticleCard(file, isAlreadyPublished, isEarlyReleased)
                ))}
            </div>
        );

// Function to render category cards
        function renderCategoryCards(articles) {
            return (
                <div className="row g-4">
                    {articles.map((file, index) => (
                        <div key={index} className="col-auto">
                            {renderArticleCard(file, isAlreadyPublished, isEarlyReleased)}
                        </div>
                    ))}
                </div>
            );
        }

// Function to render an individual article card
        function renderArticleCard(file, isAlreadyPublished, isEarlyReleased) {
            const articleLink = `/article/${isEarlyReleased ? 'early/' : ''}${file.name.replace('.json', '')}`;
            const cardTitle = file.title || 'Untitled';

            return (
                <Card className={`col-md-3 col-11 m-3 ${
                    file.isReady
                        ?'bg-success': file.authorApproved
                            ? 'blink-bg': 'bg-dark'
                }`}>
                    <Card.Body>
                        {(!isDev) && <Card.Img
                            variant="top"
                            src={file.image}
                            alt={file.title}
                        ></Card.Img>}
                        <Card.Title className="badge bg-dark-subtle text-dark">
                            {file.date}
                        </Card.Title>
                        <Card.Text>
                            {(isEarlyReleased || isAlreadyPublished) ? (
                                <a
                                    className="link-light link-underline-opacity-0 link-underline-opacity-100-hover"
                                    style={{cursor: "pointer"}}
                                    href={articleLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        copyLinkToClipboard(articleLink);
                                        return false;
                                    }}
                                >
                                    {cardTitle} <br/>
                                    <hr className={"bg-dark text-light"}/>
                                    <br/> {file.name}
                                </a>
                            ) : (
                                <div className={"text-light"}>{cardTitle} <br/>
                                    <hr className={"bg-dark text-light"}/>
                                    <br/> {file.name}</div>
                            )}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        {renderActionButtons(file, isAlreadyPublished, isEarlyReleased)}
                    </ListGroup>
                </Card>
            );
        }

// Function to render action buttons
        function renderActionButtons(file, isAlreadyPublished, isEarlyReleased) {
            const articleLink = `/article/${isEarlyReleased ? 'early/' : ''}${file.name.replace('.json', '')}`;
            console.log(file.translatedBy)
            if (((leader||(isAuthor&&(user.uid===(file.translatedBy?file.translatedBy:file.author)))) && !isAlreadyPublished && !isEarlyReleased) || (!leader&&!isAuthor)) {
                return (
                    <ListGroup.Item className="bg-dark text-white row d-flex justify-content-evenly">
                        <Button
                            variant="info"
                            className="col-3"
                            onClick={() => handleEdit(file, isAlreadyPublished, isEarlyReleased)}
                        >
                            Edit
                        </Button>

                        {(!leader&&!isAuthor) && <Button
                            className={"col-4"}
                            variant="danger"
                            onClick={() => handleDelete(file, isAlreadyPublished, isEarlyReleased)}
                        >
                            Delete
                        </Button>}

                        {(!isAlreadyPublished && isEarlyReleased && !leader&&!isAuthor) && (

                            <Button variant="success" onClick={() => {
                                handlePublish(false, file, isEarlyReleased).then();
                            }} className="col-4">
                                Normal
                            </Button>
                        )}


                        {(!isAlreadyPublished && !isEarlyReleased && !leader&&!isAuthor) && (
                            <>
                                <Button variant="success" onClick={() => {
                                    handlePublish(false, file, isEarlyReleased);
                                }}
                                        className={"col-3 justify-content-center"}>
                                    Early
                                </Button>

                                <Button variant="warning" onClick={() => {
                                    handlePublish(true, file, isEarlyReleased);
                                }}
                                        className={"col-4 justify-content-center"}>
                                    Normal
                                </Button>
                            </>
                        )}

                    </ListGroup.Item>
                );
            } else {
                return null;
            }
        }
    };


    return (
        <>
            <div className="container mt-4">
                <div className="row d-flex align-items-center">
                    <div className="col-4">
                        <h2 className="text-white">Admin Publish System</h2>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <Form className="d-flex align-items-center">
                            <Form.Check
                                type="switch"
                                id="sort-by-date-switch"
                                label="Sort by Date"
                                checked={sortByDate}
                                onChange={() => setSortByDate(!sortByDate)}
                                className="me-3"
                            />
                            <Form.Check
                                type="switch"
                                id="sort-by-category-switch"
                                label="Sort by Category"
                                checked={sortByCategory}
                                onChange={() => setSortByCategory(!sortByCategory)}
                            />
                        </Form>
                    </div>
                </div>
                <hr className="bg-dark"/>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Uploaded Files <span className="text-info small">green background means ready for publishing</span>
                    </h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {handleShowList(files, false, false)}
                </div>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Early Releases <small className="text-info">Click on an article to
                        copy the link</small></h3>
                    {earlyReleasesError && <Alert variant="danger">{earlyReleasesError}</Alert>}
                    {handleShowList(earlyReleasedArticles, false, true)}
                </div>
                <div className="mb-4">
                    <h3 className="text-light mb-3">Already Published <small className="text-info">Click on an article
                        to copy the link</small></h3>
                    {alreadyPublishedError && <Alert variant="danger">{alreadyPublishedError}</Alert>}
                    {handleShowList(alreadyPublishedArticles, true, false)}
                </div>
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        zIndex: 30000,
                    }}
                >
                    <Toast.Header>
                        <strong className="me-auto">Link Copied!</strong>
                    </Toast.Header>
                    <Toast.Body>The article link has been copied to the clipboard.</Toast.Body>
                </Toast>
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)} onExited={() => {
                setFileData({})
                setAuthorName("");
                setTranslatorName("");
            }}>
                <Modal.Header className={"bg-dark"} closeButton>
                    <Modal.Title className={"text-light"}>Edit File Data</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"bg-dark"}>
                    <Form>
                        <Form.Group controlId="content">
                            <Form.Label className={"text-light"}>Content</Form.Label>
                            <ReactQuill
                                theme="snow"
                                key={selectedFile ? selectedFile.name : ''}
                                value={fileData.content}
                                onChange={handleContentChange}
                                style={{color: "#a9a9a9"}}
                            />
                        </Form.Group>
                        <Form.Group controlId="title">
                            <Form.Label className={"text-light"}>Title</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.title}
                                onChange={(e) => handleChange(e, 'title', false)}
                            />
                        </Form.Group>
                        <Form.Group controlId="details">
                            <Form.Label className={"text-light"}>Details</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.details}
                                onChange={(e) => handleChange(e, 'details', false)}
                            />
                        </Form.Group>


                        <Form.Group controlId="socials">
                            <Form.Label className={"text-light"}>
                                Social Media Links <span className={"small"}>(enter only those available)</span>
                            </Form.Label>
                            <Row>
                                <Col>
                                    <Form.Label className={"text-light"}>Facebook:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Facebook"
                                        value={socials.facebook}
                                        onChange={(e) => handleSocialChange('facebook', e)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className={"text-light"}>Instagram:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Instagram"
                                        value={socials.instagram}
                                        onChange={(e) => handleSocialChange('instagram', e)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label className={"text-light"}>Spotify:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Spotify"
                                        value={socials.spotify}
                                        onChange={(e) => handleSocialChange('spotify', e)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className={"text-light"}>YouTube:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="YouTube"
                                        value={socials.youtube}
                                        onChange={(e) => handleSocialChange('youtube', e)}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label className={"text-light"}>Old Socials(Do not change, use the
                                        new):</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="OldSocials"
                                        value={fileData.Socials}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>


                        <Form.Group controlId="img01">
                            <Form.Label className={"text-light"}>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.img01}
                                onChange={(e) => handleChange(e, 'img01', false)}
                            />
                        </Form.Group>
                        <Form.Group controlId="translator">
                            <Form.Label
                                className={"text-light"}>Translator{translatorName && <>({translatorName})</>}</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.translatedBy}
                                onChange={(e) => {
                                    const authorRef = databaseRef(database, `authors/${e.target.value}`);
                                    try {
                                        get(authorRef).then((snapshot) => {
                                            if (snapshot.exists()) {
                                                console.log(snapshot.val())
                                                setTranslatorName(snapshot.val().displayName);
                                            } else {
                                                setTranslatorName("");
                                            }
                                        });
                                    } catch (e) {
                                        console.log(e)
                                        setAuthorName("");
                                    }
                                    handleChange(e, 'translatedBy', false);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="sub">
                            <Form.Label className={"text-light"}>Author
                                code{authorName && <>({authorName})</>}</Form.Label>
                            <Form.Control
                                type="text"
                                value={fileData.sub}
                                className={"bg-dark text-white"}
                                onChange={(e) => {
                                    const authorRef = databaseRef(database, `authors/${e.target.value}`);
                                    try {
                                        get(authorRef).then((snapshot) => {
                                            if (snapshot.exists()) {
                                                console.log(snapshot.val())
                                                setAuthorName(snapshot.val().displayName);
                                            } else {
                                                setAuthorName("");
                                            }
                                        });
                                    } catch (e) {
                                        console.log(e)
                                        setAuthorName("");
                                    }
                                    handleChange(e, 'sub', false)
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label className={"text-light"}>Date</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.date}
                                onChange={(e) => handleChange(e, 'date', false)}
                            />
                        </Form.Group>

                        <Form.Group controlId="sponsored">
                            <Form.Label className={"text-light"}>Sponsored</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.sponsor ? fileData.sponsor : ""}
                                onChange={(e) => handleChange(e, 'sponsor', false)}
                            />
                        </Form.Group>

                        <Form.Group controlId="lang">
                            <Form.Label className={"text-light"}>Language</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={fileData.lang}
                                onChange={(e) => handleChange(e, 'lang', false)}
                            />
                        </Form.Group>
                        <Form.Group controlId="translations">
                            <Form.Label className={"text-light"}>Translations</Form.Label>
                            <Form.Control
                                type="text"
                                className={"bg-dark text-white"}
                                value={JSON.stringify(fileData.translations)}
                                onChange={(e) => handleChange(e, 'translations', true)}
                            />
                        </Form.Group>

                        <Form.Group controlId="translations">
                            <Form.Label className={"text-light"}>Category</Form.Label>

                            <CategoryDropdown
                                categories={categories}
                                onSelectCategory={(category) => {
                                    handleChange({target: {value: category}}, 'category', false)
                                }}
                                required={true}
                                value={fileData.category}
                            />
                        </Form.Group>

                        <Form.Group controlId="isReady" className={"d-flex justify-content-center"}>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={"bg-dark"}>
                    <Row className={"d-flex justify-content-center"}>
                        {leader&&<Col className={"col-12 d-flex justify-content-center"}>
                            <Form.Check
                                disabled={!fileData.authorApproved}
                                type="switch"
                                id="custom-switch"
                                label={fileData.authorApproved?"The article is ready to be published":"The author has not approved their article"}
                                checked={fileData.isReady}
                                className={"bg-warning rounded-3 justify-content-center"}
                                onChange={() => {
                                    console.log(fileData.isReady)
                                    if (!fileData.isReady) {
                                        handleChange({target: {value: true}}, 'isReady', false)
                                    } else {
                                        handleChange({target: {value: false}}, 'isReady', false)
                                    }

                                }}
                                style={{
                                    fontSize: '1.25rem',
                                    transition: 'background-color 0.3s ease'
                                }}
                            />
                        </Col>}

                        {user&&(user.uid===(fileData.translatedBy?fileData.translatedBy:fileData.sub))&&<Col className={"col-12 d-flex justify-content-center"}>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="The article is ready for review"
                                checked={fileData.authorApproved}
                                className={"bg-warning rounded-3 justify-content-center"}
                                onChange={() => {
                                    console.log(fileData.authorApproved)
                                    if (!fileData.authorApproved) {
                                        handleChange({target: {value: true}}, 'authorApproved', false)
                                    } else {
                                        handleChange({target: {value: false}}, 'authorApproved', false)
                                    }

                                }}
                                style={{
                                    fontSize: '1.25rem',
                                    transition: 'background-color 0.3s ease'
                                }}
                            />
                        </Col>}
                    </Row>

                    <Row>
                        <Col className={"col-2 d-flex justify-content-center"}>
                            <Button variant="secondary" className={"m-3"} onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                        </Col>
                        <Col className={"col-6 d-flex justify-content-center"}>
                            <Button variant="primary" className={"m-3"} onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default FirebaseFileList;
