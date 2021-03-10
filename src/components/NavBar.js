import React, { useState } from "react";
import { Button, Navbar, Nav, Modal} from 'react-bootstrap';
import logo from "./assets/logo.png";
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import SignIn from "./SIGNIN.js";
import LogoutButton from "./logout-button";
import { fontColor } from "./colors";


const NavBar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated, isLoading } = useAuth0();

  const showNavNotLogged = () => {
    return (
      <Navbar bg="light" expand="lg" style={{color: fontColor.Blue}}>
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" style={{color: "white"}}> Home </Nav.Link>
            <Nav.Link as={Link} to="/about"> About</Nav.Link>
            <Nav.Link as={Link} to="/features"> Features </Nav.Link>
            <Nav.Link as={Link} to="/contact">  Contact  </Nav.Link>
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
      <Navbar bg="light" expand="lg" className="color-nav">
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/calendar"> Calendar </Nav.Link>
            <Nav.Link as={Link} to="/organizations"> Organizations </Nav.Link>
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
      { (isAuthenticated && !isLoading) ? showNavLogged() : showNavNotLogged() }
    </>
  )
}

export default withAuth0(NavBar);