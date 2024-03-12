import React, {useState} from 'react';
import {Modal, Button, Form, Row, Col, Toast, ToastContainer} from 'react-bootstrap';
import axios from "axios";

const AUTH_API = import.meta.env.VITE_API_URL + "/auth";

const UserModal = ({show, onHide, setIsLoggedIn }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setToastMessage('Please enter both email and password');
            setShowToast(true);
            return;
        }

        if (!isEmailValid(email)) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post(`${AUTH_API}/login`, {email, password});
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
        if (!email && !password && !firstName && lastName) {
            setToastMessage('Please enter all the details');
            setShowToast(true);
            return;
        }

        if (!isEmailValid(email)) {
            setToastMessage('Please enter a valid email address');
            setShowToast(true);
            return;
        }

        try {
            const response = await axios.post(`${AUTH_API}/register`, {firstName, lastName, email, password});
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
        setEmail('');
        setPassword('');
        setLastName('');
        setFirstName('');
    };

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{isRegistering ? 'Sign Up' : isLogin ? '': 'Sign In'}
                        <ToastContainer position="top-center">
                            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                                <Toast.Body className="text-danger">{toastMessage}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isRegistering ? (
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Row>
                                    <Col>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter first name" value={firstName}
                                                      onChange={(e) => setFirstName(e.target.value)}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter last name" value={lastName}
                                                      onChange={(e) => setLastName(e.target.value)}/>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email}
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email}
                                              onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" onClick={handleSwitchMode}>
                        {isRegistering ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {isRegistering ? 'Sign Up' : 'Sign In'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserModal;
