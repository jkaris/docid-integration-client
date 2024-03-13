import React, {useState} from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Toast,
    ToastContainer,
    ModalBody,
    ButtonToolbar,
    ButtonGroup
} from 'react-bootstrap';
import axios from "axios";

const AUTH_API = import.meta.env.VITE_API_URL + "/auth";

const UserModal = ({show, onHide, setIsLoggedIn}) => {
    const [userName, setUserName] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [userAffiliations, setUserAffiliations] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };

    const handleLogin = async () => {
        if (!userEmail || !userPassword) {
            setToastMessage('Please enter both email and password');
            setShowToast(true);
            return;
        }

        if (!isEmailValid(userEmail)) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post(`${AUTH_API}/login`, {userEmail, userPassword});
            setIsLoggedIn(true);
            console.log(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                setToastMessage('Invalid email or password');
                setShowToast(true);
            } else {
                console.error('Login error:', error);
                setToastMessage('An error occurred. Please try again later.');
                setShowToast(true);
            }
        }
    };

    const handleRegister = async () => {
        if (!userEmail && !userPassword && !userName && !userFullName) {
            setToastMessage('Please enter all the details');
            setShowToast(true);
            return;
        }

        if (!isEmailValid(userEmail)) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post(`${AUTH_API}/register`, {userName, userFullName, userAffiliations, userEmail, userPassword});
            setToastMessage('Sign Up successful');
            setShowToast(true);
            setIsRegistering(false);
            setIsLogin(true);
        } catch (error) {
            if (error.response.status === 401) {
                setToastMessage('Invalid email or password');
                setShowToast(true);
            } else {
                setToastMessage('An error occurred. Please try again later.');
                setShowToast(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        if (isRegistering) {
            handleRegister();
        } else {
            handleLogin();
        }
    };


    const handleSwitchMode = () => {
        setIsRegistering(!isRegistering);
        setIsLogin(!isLogin);
        setUserEmail('');
        setUserPassword('');
        setUserFullName('');
    };

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{isRegistering ? 'Sign up today' : isLogin ? '' : 'Log in to account'}
                        <ToastContainer position="top-center">
                            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                                <Toast.Body className="text-danger">{toastMessage}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Modal.Title>
                </Modal.Header>
                <ModalBody className="bg-body-secondary">
                    {isLogin ?
                        <ButtonGroup size="sm">
                            <Button className="m-1" variant="secondary">
                                <i className="bi bi-github" aria-hidden="true"></i>
                                Sign up with GitHub</Button>
                            <Button className="m-1" variant="secondary">Sign up with ORCID</Button>
                            <Button className="m-1" variant="secondary">Sign up with OpenAIRE</Button>
                        </ButtonGroup> :
                        <ButtonGroup size="sm">
                            <Button className="m-1" variant="secondary">
                                <i className="bi bi-github" aria-hidden="true"></i>
                                Sign in with GitHub</Button>
                            <Button className="m-1" variant="secondary">Sign in with ORCID</Button>
                            <Button className="m-1" variant="secondary">Sign in OpenAIRE</Button>
                        </ButtonGroup>}
                </ModalBody>
                <Modal.Body className="bg-primary-subtle">
                    {isRegistering ? (
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" placeholder="Username" value={userName} className="mt-3 mb-3"
                                              onChange={(e) => setUserName(e.target.value)}/>
                                <Form.Control type="text" placeholder="Full name" value={userFullName}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserFullName(e.target.value)}/>
                                <Form.Control type="text" placeholder="Affiliations" value={userAffiliations}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserAffiliations(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email Address" value={userEmail}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" value={userPassword}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Email Address" value={userEmail}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" value={userPassword}
                                              className="mt-3 mb-3"
                                              onChange={(e) => setUserPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {isRegistering ? <p>Already have an account?</p> : <p>Don't have an account?</p>}
                    <Button variant="link" onClick={handleSwitchMode}>
                        {isRegistering ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        {isRegistering ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserModal;
