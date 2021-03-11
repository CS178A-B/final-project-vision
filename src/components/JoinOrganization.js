// src/components/JoinOrganization.js

import React, { useEffect, useState } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading";
import { Button, Navbar, Nav, Modal, Container, Row, Col} from 'react-bootstrap';
import logo from "./assets/logo.png";
import { useHistory } from "react-router-dom";

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const JoinOrganization = props => {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(null);
  const [orgInfo, setOrgInfo] = useState(null);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const rowStyle = { backgroundColor: '#c8e6c9', height: '70px', padding: '5px 0' };

  const joinOrgHandler = async () => {
    try {
      const token = await getAccessTokenSilently();
      const myHeaders = new Headers();
      const data = new FormData();
      myHeaders.append('Authorization', `Bearer ${token}`)
      data.append("organization_id", props.match.params.id)
      fetch(API + "addOrganization", {
        method: 'POST',
        headers: myHeaders,
        body: data,
      }).then(res => res.json())
      .then(() => {
        history.push('/calendar')
        window.location.reload(false)
      })
    } catch( error) {
      setError(true)
    }
  }

  useEffect(() => {
    const loadOrgInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        fetch(API + "getOrgInfo?" + new URLSearchParams({organization_id: props.match.params.id}),{
          method: 'GET',
          headers: myHeaders
        }).then(res => res.json())
          .then(res => {
            setOrgInfo(res)
          })
        setError(false)
      } catch (error) {
        console.log(error)
      }
    }
    loadOrgInfo()
  },[ getAccessTokenSilently])

  const showOrgInfo = () => 
  <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
            <Modal.Title>Join this organization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container>
            <Row className="justify-content-md-center" rowStyle={rowStyle}>
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
            <Col style={{fontSize: "25px"}} className="text-center">
              {orgInfo["Organization Name"]}
            </Col>
            </Row>
            <Row>
            <Col className="text-center">
              {orgInfo["Organization Description"]}
            </Col>
            </Row>
            <Row>
            <Col className="text-center">
              <Button variant="outline-success" onClick={joinOrgHandler}> Join </Button>
            </Col>
            </Row>
          </Container>
          </Modal.Body>
    </Modal>
  </>

  const showErrorMsg = () => (
  <div className="text-center">
    Sorry... erm, an error occured. The code {props.match.params.id} does not exist... 
  </div>
  )
    return (
      <>
      {orgInfo === null ? <></> : showOrgInfo()}
      </>
    );
}

export default withAuthenticationRequired(JoinOrganization, {
  onRedirecting : () => <Loading />,
});