import React from "react";
import { Navbar, Row, Col, Container} from 'react-bootstrap';
import logo from "./assets/logo.png";
import { withAuth0 } from "@auth0/auth0-react";
import './SIGNIN.css';
import LoginButton from "./login-button";

const SignIn = props =>  {
  const rowStyle = { backgroundColor: '#c8e6c9', height: '70px', padding: '5px 0' };

  return (
    <Container>
      <Row className="justify-content-md-center" rowStyle={rowStyle}>
      <Col className="text-center">
        Sign in to
      </Col>
      </Row>
      <Row>
      <Col className="text-center">
        <Navbar.Brand id="signin-navbar-brand">
          <img
            src={logo}
            width="53"
            height="53"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}
          VISION
        </Navbar.Brand>
      </Col>
      </Row>
      <Row>
      <Col className="text-center">
        Log in to access your account and save your progress. We don't post anything anywhere.
      </Col>
      </Row>
      <Row>
      <Col>
      <LoginButton /> 
      </Col>
      </Row>
    </Container>
  )
}

export default withAuth0(SignIn);