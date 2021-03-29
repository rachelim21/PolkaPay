import React from 'react';

// import images
import logo from '../logo.png';

// import styles
import '../assets/Home.css';

// import components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

const HomeNavbar = () => {

  return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mr-2 ml-2"
                />{' '}
                PolkaPay
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/features">Features</Nav.Link>
                    <Nav.Link href="/pricing">Pricing</Nav.Link>
                    <Nav.Link href="https://github.com/rachelim21/PolkaPay">Documentation</Nav.Link>
                    <Dropdown title="Login" id="basic-nav-dropdown" alignRight>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                            Login
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/reader">Reader</Dropdown.Item>
                            <Dropdown.Item href="/publisher">Publisher</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
  );
}

export default HomeNavbar;