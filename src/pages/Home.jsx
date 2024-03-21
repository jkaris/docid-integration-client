import Container from "react-bootstrap/Container";
import {Button, Col, Card, CardGroup, Row} from "react-bootstrap";
import UserModal from "../components/modal/UserModal.jsx";
import {useState} from "react";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function Home() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => setShowLoginModal(true);
    const handleCloseLoginModal = () => setShowLoginModal(false);
    return (
        <>
            <div className="home">
                <div className="hero" style={{backgroundColor: "#196AA9"}}>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Welcome to the DOCID Integration App</h1>
                                <p>Considering the fast and growing need for scholarly data infrastructures in Africa,
                                    and the diverse economic development in the continent. The reality is that some
                                    universities can afford DOIs but not for all scholarly and research output, while
                                    the bulk of research content is in gray literature in Africa. Adding to that the
                                    unicity of what the APA RA would like to specialize in, which is indigenous
                                    knowledge and cultural heritage, and patent digital object containers.</p>
                                <Button onClick={handleShowLoginModal} variant="outline-info" size="lg">Get Started</Button>
                                <UserModal
                                    show={showLoginModal}
                                    onHide={handleCloseLoginModal}/>
                            </Col>
                        </Row>
                            <CardGroup className="p-2">
                                    <Card className="m-5">
                                        <Card.Img variant="top" src="africa-pid-logo.png"/>
                                    </Card>
                                    <Card className="m-5">
                                        <Card.Img variant="top" src="tcc-logo.png"/>
                                    </Card>
                                </CardGroup>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Home;
