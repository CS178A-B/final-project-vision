import React, { useState } from 'react';
import Homeblock from './components/Homeblock';
import NavBar from './components/NavBar';
import { Button, Container, Modal, Row, Col } from 'react-bootstrap';
import SignIn from "./components/SIGNIN.js";
import { fontColor } from "./components/colors";
import logo from "./components/assets/homeimg.png";
import { Animated } from "react-animated-css";

const Home = props => {
   // set up state here
  const [showPopup, togglePopup] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleToggle = () => {
    togglePopup(!showPopup)
  } 


    return (
      <div>
        <NavBar/>
        {/* <Homeblock togglePop={handleToggle} /> */}
        
        <Container fluid style={{ padding: "0" }}>
          <Row style={{margin: "0", padding: "0"}}>
            <Col sm={12} md={{span: 6}} lg={{offset: 1, span: 5}} style={{padding: "0"}}>
              <Row className="text-center">
                <Row>
                  <Col>
                  <Animated animationIn="fadeInDownBig">
                    <h1 color={fontColor.Red}>Schedule Events.</h1>
                  </Animated>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Animated animationIn="jello">
                    <h1 color={fontColor.Yellow}>Manage groups.</h1>
                  </Animated>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Animated animationIn="flipInY">
                    <h1 color={fontColor.Green}>Assign tasks.</h1>
                  </Animated>
                  </Col>
                </Row>            
              </Row>
              <Row>
                <Button variant="outline" style={{ color: fontColor.Blue, border: `1px solid ${fontColor.Blue}`, padding: "20px", borderRadius: "50px", fontSize: "16px" }} size="lg" onClick= {handleShow}
                >TRY VISION FOR FREE</Button>
              </Row>
            </Col>
            <Col style={{padding: "0"}} sm={{span: 12}}md={{ span: 12}} lg={6}>
              <img
              src={logo}
              width="550px"
              className="d-inline-block align-right justify-content-end"
              alt="React Bootstrap logo"
              style={{ float: "right" }}
            />
            </Col>
          </Row>
        </Container>


        
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <SignIn />
          </Modal.Body>
        </Modal>
      </div>
    );
}

export default Home;