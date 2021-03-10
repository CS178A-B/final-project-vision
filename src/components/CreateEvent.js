import React, { useState } from 'react'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import { Button, Modal} from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './loading'
import EventsForm from "./EventsForm";

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const CreateEvent = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
        <div>
        {/* You can loop through props.delegatedOrgs with the map function (kinda like organizationsBlock) */}
          <Button variant="outline-success" 
            onClick= {handleShow}
          >Create Event</Button>
            <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <EventsForm closeHandle={handleClose} organization_id="60485de4474d57537b816ba9"/>
          </Modal.Body>
        </Modal>
        </div>
    )
}


export default withAuthenticationRequired(CreateEvent, {
    onRedirecting: () => <Loading />,
  });