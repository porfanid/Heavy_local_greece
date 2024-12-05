import React, {lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {auth, config, database, storage} from "../../firebase";
import {getDownloadURL, ref, updateMetadata} from "firebase/storage";
import {onValue, ref as databaseRef, remove, update} from "firebase/database";
import {fetchAndActivate, getValue} from "firebase/remote-config";
import {Helmet} from "react-helmet";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {parseDOM} from 'htmlparser2';
import "./comments.css";

import {getFirebaseStorageUrl} from "../../systems/UploadSystem/articleData/articleData";

const SocialBar = lazy(() => import("../ShareBtns/SocialMediaBar"));
const ReadMore = lazy(() => import("../ReadMore/ReadMore"));
const AuthorOfArticle = lazy(() => import("./AuthorOfArticle"));
const NavLink = lazy(() => import("../LanguageWrapper/NavLink"));
const LanguageModal = lazy(() => import("./LanguageModal"));
const CommentSystem = lazy(() => import("./Comments/CommentSystem"));
const TextToSpeech = lazy(() => import("./TextToSpeech/TextToSpeech")); // Lazy load the TTS component

const DefaultArticle = (props) => {
    const isEarlyAccess = props.earlyAccess;
    const {name} = useParams();
    const [articles, setArticles] = useState({});
    const [enableSaving, setEnableSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [translations, setTranslations] = useState({});
    const [availableLanguages, setAvailableLanguages] = useState({});
    const [loading, setLoading] = useState(true);
    const [sponsoredImage, setSponsoredImage] = useState(null);
    const [spokenMarks, setSpokenMarks] = useState([]); // Array to track spoken marks
    const [shouldStoreMetadata, setShouldStoreMetadata] = useState(false);
    const [imageStorageRef, setImageStorageRef] = useState(null);
    const [marks, setMarks] = useState([]);
    const {t, i18n} = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const {search} = useLocation();
    const commentId = useMemo(() => new URLSearchParams(search).get('commentId'), [search]);

    const fetchSavedStatus = useCallback(async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles`);
            onValue(savedArticlesRef, (snapshot) => {
                const savedArticles = snapshot.val() || {};
                setIsSaved(Object.keys(savedArticles).includes(name));
            });
        }
    }, [name]);

    const player = useRef();



    useEffect(() => {
        let lastScrollTop = 0;
        const playertemp = player.current//document.querySelector('.player-mobile');

        const onScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                player.current.classList.add('player-hidden');
            } else {
                // Scrolling up
                player.current.classList.remove('player-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);


    useEffect(() => {
        const fetchRemoteConfig = async () => {
            await fetchAndActivate(config);
            const serverLanguages = getValue(config, "languages").asString();
            setAvailableLanguages(JSON.parse(serverLanguages));
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const articleRef = ref(storage, `${isEarlyAccess ? "early_releases" : "articles"}/${name}.json`);
                const articleSnapshot = await getDownloadURL(articleRef);
                const articleData = await fetch(articleSnapshot).then(response => response.json());

                const [imageUrl, translationsResult, sponsoredImage] = await Promise.all([
                    getFirebaseStorageUrl(articleData.img01, setShouldStoreMetadata, setImageStorageRef),
                    articleData.translations ? checkTranslations(articleData) : Promise.resolve({}),
                    articleData.sponsor ? getDownloadURL(ref(storage, `sponsors/${articleData.sponsor}`)) : Promise.resolve(null),
                ]);

                setTranslations(translationsResult);
                setSponsoredImage(sponsoredImage);
                articleData.img01 = imageUrl;
                articleData.content = processHtml(articleData.content)
                setMarks(extractMarks(articleData.content))
                setArticles(articleData);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRemoteConfig().then(fetchData);

        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setEnableSaving(true);
                fetchSavedStatus();
            }
        });

        return () => {
            unsubscribeAuth();
        };
    }, [name, isEarlyAccess,]);

    useEffect(() => {
        if (articles.content) {
            // Update content when spokenMarks change
            setArticles(prevArticles => ({
                ...prevArticles,
                content: highlightText(prevArticles.content, spokenMarks)
            }));
        }
    }, [spokenMarks]);

    const extractMarks = (content) => {
        const markRegex = /<mark\s+name="([^"]+)"/g;
        const marks = [];
        let match;
        while ((match = markRegex.exec(content)) !== null) {
            marks.push(match[1]);
        }
        return marks;
    };

    const processText = (text) => {
        const words = text.split(' ').map((word, index) => {
            return `<mark name="word${index}"/>${word}`;
        }).join(' ');
        return words;
    };

    const processHtml = (html) => {
        const parsedHtml = parseDOM(html);
        const processNode = (node) => {
            if (node.type === 'text') {
                return processText(node.data);
            } else if (node.type === 'tag') {
                const children = (node.children || []).map(processNode).join('');
                return `<${node.name}${node.attribs ? ' ' + Object.entries(node.attribs).map(([key, value]) => `${key}="${value}"`).join(' ') : ''}>${children}</${node.name}>`;
            } else {
                return '';
            }
        };
        return parsedHtml.map(processNode).join('');
    };

    const highlightText = (content, spokenMarks) => {
        spokenMarks.forEach(mark => {
            const markRegex = new RegExp(`(<mark\\s+name="${mark}"[^>]*)(>)`, 'g');
            content = content.replace(markRegex, `$1 class="text-primary"$2`);
        });
        return content;
    };

    const checkTranslations = useCallback(async (data) => {
        const translations = {};
        for (const translation of Object.keys(data.translations)) {
            const translationExists = await checkIfTranslationExists(data.translations[translation]);
            if (translationExists) {
                translations[translation] = data.translations[translation].replace(".json", "");
            }
        }
        return translations;
    }, [isEarlyAccess]);

    const toggleSaveArticle = useCallback(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const savedArticlesRef = databaseRef(database, `users/${currentUser.uid}/savedArticles/${name}`);
            if (isSaved) {
                remove(savedArticlesRef);
                setIsSaved(false);
            } else {
                update(savedArticlesRef, {isEarlyAccess});
                setIsSaved(true);
            }
        }
    }, [isSaved, name, isEarlyAccess]);

    const checkIfTranslationExists = useCallback(async (translationFile) => {
        translationFile = translationFile.endsWith('.json') ? translationFile : `${translationFile}.json`;
        const folder = isEarlyAccess ? "early_releases" : "articles";
        const filePath = `${folder}/${translationFile}`;
        const fileRef = ref(storage, filePath);
        try {
            await getDownloadURL(fileRef);
            return true;
        } catch (error) {
            return false;
        }
    }, [isEarlyAccess]);

    if (loading) {
        return (
            <Spinner style={{
                width: '100px',
                height: '100px',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto'
            }} animation="border" role="status">
                <span className="visually-hidden">{t('loadingMessage')}</span>
            </Spinner>
        );
    }

    return (
        <>
            <Suspense fallback={<Spinner animation="border" role="status"><span
                className="visually-hidden">{t('loadingMessage')}</span></Spinner>}>
                <LanguageModal
                    languages={availableLanguages}
                    articleLanguage={articles.lang}
                    siteLanguage={i18n.language}
                    show={showModal}
                    handleClose={handleCloseModal}
                    targetLink={(translations[i18n.language]) ? `/article${isEarlyAccess ? "/early" : ""}/${translations[i18n.language].replace(".json", "")}` : ""}
                />
                <Helmet>
                    <title>{articles.title}</title>
                </Helmet>
                <div className="container text-white">
                    <div className="row">
                        <div className={"col-12 col-md-2"}>
                            <span className={"badge bg-light text-dark"}>{articles.date}</span>
                        </div>
                        <div className={`col-10 col-md-9 ${enableSaving ? "d-flex justify-content-between" : ""}`}>
                            <h3>{articles.title}</h3>
                            {enableSaving && <i onClick={toggleSaveArticle} style={{cursor:"pointer"}}
                                                className={`text-primary bi bi-bookmark${isSaved ? "-fill" : ""} h3`}></i>}
                        </div>
                        <div className="col-10 col-md-5 mb-3 mb-md-0 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.sub}/>
                        </div>
                        {articles.translatedBy && <div className="col-10 col-md-5 d-flex align-items-center">
                            <AuthorOfArticle authorCode={articles.translatedBy}/>
                        </div>}
                    </div>
                    <hr className={"mt-2 bg-dark"}/>
                    <div className="row d-flex">
                        <div className="col-md-4 col-12 sticky-md-top">
                            <div className="sticky-md-top">
                                {articles.img01 && (
                                    <img
                                        className="img-fluid w-100"
                                        src={articles.img01}
                                        alt={articles.title}
                                        onLoad={async (image) => {
                                            if (shouldStoreMetadata) {
                                                const metadata = {
                                                    customMetadata: {
                                                        width: image.target.width,
                                                        height: image.target.height,
                                                    },
                                                };
                                                await updateMetadata(imageStorageRef, metadata);
                                            }
                                        }}
                                    />
                                )}
                                <p className="lead">
                                    <span dangerouslySetInnerHTML={{__html: articles.details}}></span>
                                </p>
                                <div className="lead">
                                    <div className="m-3 d-none d-lg-block">
                                        <TextToSpeech
                                            articleName={name}
                                            ttsMarks={marks}
                                            setSpokenMarks={setSpokenMarks}
                                            filePath={`${isEarlyAccess ? "early_releases" : "articles"}/${name}.json`}
                                        /> {/* TTS Component */}
                                    </div>
                                    <div ref={player} className={"d-lg-none sticky-bottom player-mobile"}>
                                        <TextToSpeech
                                            articleName={name}
                                            ttsMarks={marks}
                                            setSpokenMarks={setSpokenMarks}
                                            filePath={`${isEarlyAccess ? "early_releases" : "articles"}/${name}.json`}
                                        /> {/* TTS Component */}
                                    </div>
                                </div>
                                <div className="lead">
                                    {articles.socials ? (
                                        <div className="lead">
                                            {articles.socials.facebook && (
                                                <a href={articles.socials.facebook}>
                                                    <i className="bi bi-facebook"></i>
                                                </a>
                                            )}
                                            {articles.socials.instagram && (
                                                <a href={articles.socials.instagram}>
                                                    <i className="bi bi-instagram"></i>
                                                </a>
                                            )}
                                            {articles.socials.spotify && (
                                                <a href={articles.socials.spotify}>
                                                    <i className="bi bi-spotify"></i>
                                                </a>
                                            )}
                                            {articles.socials.youtube && (
                                                <a href={articles.socials.youtube}>
                                                    <i className="bi bi-youtube"></i>
                                                </a>
                                            )}
                                        </div>
                                    ) : (
                                        <span dangerouslySetInnerHTML={{__html: articles.Socials}}></span>
                                    )}
                                </div>

                                {translations && Object.keys(translations).length > 0 && (
                                    <>
                                        <hr className="bg-dark"/>
                                        <h5>Translations</h5>
                                        {Object.keys(translations).map((translation) => (
                                            <NavLink
                                                className="btn btn-dark"
                                                to={`/article${isEarlyAccess ? "/early" : ""}/${translations[translation].replace(".json", "")}`}
                                                key={translation}
                                            >
                                                {availableLanguages[translation]}
                                            </NavLink>
                                        ))}
                                    </>
                                )}

                                <hr className="bg-dark"/>
                                <a
                                    href="https://buymeacoffee.com/tzimasvagg7"
                                    className="btn btn-danger 25 m-2 rounded-4"
                                >
                                    Say Thanks
                                </a>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div
                                className={"text-white"}
                                style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}
                                dangerouslySetInnerHTML={{__html: articles.content}}
                            ></div>
                            <SocialBar/>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <CommentSystem commentId={commentId} articleName={name}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReadMore category={articles.category} isEarlyAccess={isEarlyAccess}/>
                </div>
            </Suspense>
        </>
    );
};

export default DefaultArticle;
