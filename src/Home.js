import React, { useState } from 'react';
import { Button, Container, Modal, Row, Col } from 'react-bootstrap';
import SignIn from "./components/SIGNIN.js";
import { fontColor } from "./components/colors";
import logo from "./components/assets/homeimg.png";
import { Animated } from "react-animated-css";

const Home = props => {
   // set up state here

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    return (
      <div>
        <Container fluid style={{ padding: "0"}}>
          <Row style={{margin: "0", padding: "0"}}>
            <Col xs={{ span: 5, offset: 2 }} sm={{span: 8}} md={{span: 5}} lg={{offset: 1, span: 5}} style={{padding: "0"}}>
              <Row>
                <Row >
                  <Col>
                  <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" animationInDuration={1000} animationOutDuration={1000} >
                    <h1 style={{ color: fontColor.Red }}>Schedule Events.</h1>
                  </Animated>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" animationInDuration={1500} animationOutDuration={1000} >
                    <h1 style={{ color: fontColor.Yellow}}>Manage groups.</h1>
                  </Animated>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Animated animationIn="fadeInLeft" animationOut="fadeOutLeft" animationInDuration={2000} animationOutDuration={1000} >
                    <h1 style={{ color: fontColor.Green }}>Assign tasks.</h1>
                  </Animated>
                  </Col>
                </Row>            
              </Row>
              <Row>
                <Button variant="outline" style={{ color: fontColor.Blue, border: `1px solid ${fontColor.Blue}`, padding: "20px", borderRadius: "50px", fontSize: "16px" }} size="lg" onClick= {handleShow}
                >TRY VISION FOR FREE</Button>
              </Row>
            </Col>
            <Col style={{padding: "0", zIndex: "-1" }} xs={{ span: 12 }} sm={{span: 12 }} md={{ span: 12}} lg={6} >
            <Animated animationIn="fadeInRight" animationOut="fadeOutRight" animationInDuration={2000} animationOutDuration={1000} >
                <img
                  src={logo}
                  width="600px"
                  className="d-inline-block align-right justify-content-end"
                  alt="Home Image"
                  style={{ opacity: "0.8" }}
                />
              </Animated>
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