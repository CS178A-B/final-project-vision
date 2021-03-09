import React, { useState } from "react";
import { Button, Navbar, Nav, Modal} from 'react-bootstrap';
import logo from "./assets/logo.png";
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import SignIn from "./SIGNIN.js";
import LogoutButton from "./logout-button"


const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const showNavNotLogged = () => {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="28"
            height="28"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}
          VISION
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link>Home</Link>
            </Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link>Features</Nav.Link>
            <Nav.Link>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end text-center">
          <Button variant="outline-success" 
            onClick= {handleShow}
          >Sign In</Button>
        </Navbar.Collapse>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <SignIn />
          </Modal.Body>
        </Modal>
      </Navbar>
    )
  }

  const showNavLogged = () => {
    return(
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <img
            src={logo}
            width="28"
            height="28"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}
          VISION
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mr-auto">
            <Nav.Link>Calendar</Nav.Link>
            <Nav.Link>Organizations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end text-center">
          <LogoutButton />
        </Navbar.Collapse>
      </Navbar>
    )
  }

  return (
    <>
    { isAuthenticated ? showNavLogged() : showNavNotLogged() }
    </>
  )
}

export default withAuth0(NavBar);