import React, { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { auth, database, storage } from "../../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import {Accordion, Nav, Spinner} from 'react-bootstrap';

const ArticlesList = () => {
    const [articles, setArticles] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState("Collabs and Sponsorships");
    const [loggedIn, setLoggedIn] = useState(false);

    const nice_titles = {
        "early_releases": "Early Bird Articles",
        "articles": "All Articles",
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesRef = ref(database, 'articlesList');
                onValue(articlesRef, async(snapshot)=>{
                    const data = snapshot.val();

                    const articlesWithImages = await fetchArticlesWithImages(data);
                    setArticles(articlesWithImages);
                    setLoading(false); // Only set loading to false after data fetching is complete
                });

            } catch (error) {
                console.error("Error fetching articles:", error);
                setLoading(false); // Ensure loading state is set to false in case of error
            }
        };

        auth.onAuthStateChanged((user) => {
            fetchData().then();
            if (!user) {
                setLoggedIn(false);
                setActiveKey("Collabs and Sponsorships");
                // Set loading to false immediately if user is not logged in
            } else {
                setLoggedIn(true);
                setActiveKey("early_releases");
                fetchData(); // Fetch data when user is logged in
            }
        });

    }, []);

    const fetchArticlesWithImages = async (data) => {
        const updatedData = {};

        for (const category in data) {
            const categoryData = data[category];
            updatedData[category] = {};

            for (const subCategory in categoryData) {
                updatedData[category][subCategory] = await Promise.all(
                    categoryData[subCategory].map(async (articleKey) => {
                        try {
                            const articleUrl = await getDownloadURL(
                                storageRef(storage, `${category}/${articleKey}.json`)
                            );

                            const response = await fetch(articleUrl);
                            if (!response.ok) {
                                throw new Error(`Failed to fetch article ${articleKey}`);
                            }

                            const article = await response.json();
                            article.link = articleKey;
                            return article;
                        } catch (error) {
                            console.error("Error fetching article:", error);
                            return null; // Return null or handle error conditionally
                        }
                    })
                );
            }
        }

        return updatedData;
    };

    const renderArticles = (category, articles) => {
        const renderedTranslationGroups = new Set();
        return Object.values(articles).flat().map((article, index) => {
            if (!article) return null; // Skip rendering if article is null (due to fetch error)

            const translationGroup = (article.translations) ? Object.values(article.translations).sort().join('-') : "";

            if (renderedTranslationGroups.has(translationGroup)) {
                return null;
            }

            renderedTranslationGroups.add(translationGroup);

            return (
                <div className="col-auto" key={index}>
                    <div className="card mb-4">
                        <div className="card-header">
                            {article.img01 && (
                                <img
                                    src={article.img01}
                                    alt={article.title}
                                    className="card-img-top mb-2"
                                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <div className="card-body">
                            {article.title}
                            <div className="card-text">
                                <NavLink to={`/article${(category === 'early_releases') ? '/early' : ''}/${article.link}`} className="btn btn-danger">Read More</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container " style={{ marginBottom: "11.4vh" }}>
            {loading ? (
                <Spinner style={{
                    width: '100px',
                    height: '100px',

                    position: 'absolute',
                    top:0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: 'auto'
                }} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

            ) : (
                <div className="row bg-dark">
                    <div className="col-md-3">
                        <Nav variant="pills" className="flex-column sticky-top" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
                            {loggedIn && (
                                <Nav.Item>
                                    <Nav.Link eventKey="early_releases">{nice_titles['early_releases']}</Nav.Link>
                                </Nav.Item>
                            )}
                            {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                <Nav.Item key={subIndex}>
                                    <Nav.Link eventKey={subCategory}>{subCategory.replace('_', ' ')}</Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                    <div className="col-md-9">
                        <Accordion className="bg-dark" activeKey={activeKey} onSelect={(e) => setActiveKey(e)}>
                            {loggedIn && (
                                <Accordion.Item className="bg-dark" eventKey="early_releases">
                                    <Accordion.Header className="bg-dark">{nice_titles['early_releases']}</Accordion.Header>
                                    <Accordion.Body className="row">
                                        {renderArticles('early_releases', articles['early_releases'] || {})}
                                    </Accordion.Body>
                                </Accordion.Item>
                            )}
                            {Object.keys(articles['articles'] || {}).map((subCategory, subIndex) => (
                                <Accordion.Item className="bg-dark" eventKey={subCategory} key={subIndex}>
                                    <Accordion.Header>{subCategory.replace('_', ' ')}</Accordion.Header>
                                    <Accordion.Body className="row">
                                        {renderArticles('articles', articles['articles'][subCategory] || {})}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticlesList;