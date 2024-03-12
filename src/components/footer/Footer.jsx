import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
function Footer({routes}) {
    return (
        <footer>
            <Navbar sticky="bottom" expand={"xs" ? "lg" : undefined} style={{ backgroundColor: "#196AA9" }}>
                <Container fluid style={{color: "#FFFFFF" }}>
                    <Navbar.Brand href="/">
                            <img
                                alt="TCC Logo"
                                src="/src/assets/docid_logo.png"
                                height={60}
                                className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>

                    {routes.map((route, index) => (
                    <Nav.Item key={index} >
                        <Nav.Link href={route.path}>{route.name}</Nav.Link>
                    </Nav.Item>
                    ))}
                </Container>
            </Navbar>
        </footer>
    );
}

export default Footer;