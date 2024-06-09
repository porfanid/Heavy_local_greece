import React, {useState} from 'react';
import {Form, Button, Alert, Row, Col} from 'react-bootstrap';
import {auth} from '../../../firebase';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Update user profile with name
            await updateProfile(user, {displayName: name});
            // Send email verification
            await sendEmailVerification(user);
            // Set success message
            setSuccess('The account was successfully created. Please check your email for verification.');
        } catch (error) {
            setError(error.message);
        }
    };

    const registerWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            await updateProfile(user, {displayName: name});
            setSuccess('The account was successfully created. If you are an author, please contact the administrator so that he/she can give you access to publishing articles');
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h2 className="text-center mb-4 text-white">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form className={"card bg-dark w-100 text-white p-4"} onSubmit={handleRegister}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                        <Form.Group className={"row"} controlId="buttons">
                        <Button className={"col-4"} variant="danger" type="button" onClick={registerWithGoogle}>
                            Register with google
                        </Button>

                        <Button className={"col-3"} style={{marginRight:"3vh", marginLeft:"3vh"}} variant="secondary" type="button" onClick={() => {
                            navigate("/upload/login")
                        }}>
                            Login
                        </Button>

                        <Button className={"col-3"} variant="primary" type="submit">
                            Register
                        </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
