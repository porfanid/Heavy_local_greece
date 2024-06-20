import React, {useEffect, useState} from 'react';
import {Alert, Button, Form} from 'react-bootstrap';
import {auth, database, storage} from '../../../firebase';
import {
    EmailAuthProvider,
    getIdTokenResult,
    reauthenticateWithCredential,
    updatePassword,
    updateProfile
} from "firebase/auth";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {get, ref as databaseRef, update} from "firebase/database";
import {useTranslation} from 'react-i18next';

const UserProfile = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState(auth.currentUser || null);
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(user?.photoURL || '');
    const [userRef, setUserRef] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const idTokenResult =  await getIdTokenResult(user);
            let userFolder;
            if (idTokenResult.claims && idTokenResult.claims.admin) {
                userFolder = 'authors';
            } else {
                userFolder = 'users';
            }

            const userRef = databaseRef(database, `${userFolder}/${user.uid}`);
            setUserRef(userRef);
            const userstore = await get(userRef);

            if (userstore.exists()) {
                const userData = userstore.val();
                if (!userData.wantToShow) {
                    userData.wantToShow = false;
                } else {
                    user.wantToShow = userData.wantToShow;
                }
            }

            setUser(user);
            setDisplayName(user?.displayName || '');
            setProfileImageUrl(user?.photoURL || '');
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <div>{t('loading')}</div>;
    }

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleProfileImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            if (profileImage) {
                const imageRef = ref(storage, `profile_images/${user.uid}`);
                await uploadBytes(imageRef, profileImage);
                const imageUrl = await getDownloadURL(imageRef);
                await updateProfile(user, {
                    displayName: displayName.trim(),
                    photoURL: imageUrl,
                });
                setProfileImageUrl(imageUrl);
            } else {
                await updateProfile(user, {
                    displayName: displayName.trim(),
                });
            }

            await update(userRef, {
                email: user.email,
                displayName: displayName.trim(),
                photoURL: user.photoURL || ''
            });

            setSuccessMessage(t('profileUpdatedSuccess'));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError(t('passwordsDoNotMatch'));
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            setSuccessMessage(t('passwordUpdatedSuccess'));
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div style={{color: '#fff'}}>
                <h2 className="row d-flex text-white">
                    <p className="col-4 h1">{t('userProfile')}</p>
                    <Form className="col d-flex justify-content-end">
                        <Form.Check
                            type="switch"
                            id="sort-by-date-switch"
                            label={t('showProfilePicture')}
                            checked={user.wantToShow}
                            onChange={() => {
                                user.wantToShow = !user.wantToShow;
                                update(userRef, {
                                    wantToShow: user.wantToShow
                                });
                            }}
                        />
                    </Form>
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleUpdateProfile}>
                    <Form.Group controlId="displayName">
                        <Form.Label>{t('displayName')}</Form.Label>
                        <Form.Control
                            type="text"
                            value={displayName}
                            onChange={handleDisplayNameChange}
                            style={{backgroundColor: '#333', color: '#fff'}}
                        />
                    </Form.Group>
                    <Form.Group controlId="profileImage">
                        <Form.Label>{t('profileImage')}</Form.Label>
                        {profileImageUrl && (
                            <div className="mt-2">
                                <img
                                    src={profileImageUrl}
                                    alt="Profile"
                                    style={{width: '100px', height: '100px', borderRadius: '50%'}}
                                />
                            </div>
                        )}
                        <Form.Control
                            type="file"
                            onChange={handleProfileImageChange}
                            style={{backgroundColor: '#333', color: '#fff'}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('updateProfile')}
                    </Button>
                </Form>
                <Form onSubmit={handleUpdatePassword}>
                    <Form.Group controlId="currentPassword">
                        <Form.Label>{t('currentPassword')}</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            style={{backgroundColor: '#333', color: '#fff'}}
                        />
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>{t('newPassword')}</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            style={{backgroundColor: '#333', color: '#fff'}}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>{t('confirmNewPassword')}</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            style={{backgroundColor: '#333', color: '#fff'}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {t('updatePassword')}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UserProfile;
