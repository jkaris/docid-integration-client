import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Search from "./Search.jsx";
import {LanguageSelector} from "./LanguageSelector.jsx";
function NavigationBar({routes}) {
    const expand = false;
    return (
        <>
            <Navbar sticky="top" expand={"xs" ? "lg" : undefined} className="mb-3 top-nav-color">
                <Container fluid style={{color: "#FFFFFF"}}>
                    <Navbar.Brand href="/">
                        <img
                            alt="DocID Logo"
                            src="/src/assets/docid_logo.png"
                            height={60}
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="px-4 flex-grow-1 pe-3 offcanvastext">
                                <Search/>
                                {routes.map((route, index) => (
                                    <Nav.Link key={index} href={route.path} style={{color: "#ffffff"}}>
                                        {route.name}
                                    </Nav.Link>
                                ))}
                            </Nav>
                            <Nav className="px-4 flex-grow-1 pe-3 offcanvastext">
                                <LanguageSelector/>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Navbar expand={"lg" ? "md" : undefined} className="mb-3" style={{backgroundColor: "#0397D5"}}>
                <Container fluid>
                    <Nav.Item>Select the community where you want to submit your record.</Nav.Item>
                    <Button variant="primary" size="sm">Search</Button>
                </Container>
            </Navbar>
        </>
    );
}

export default NavigationBar;
