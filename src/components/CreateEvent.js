import React, { useState } from 'react'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import { Button, Modal} from 'react-bootstrap';
import Loading from './loading'
import EventsForm from "./EventsForm";

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const CreateEvent = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
        <div>
        <Button variant="outline-success" 
            onClick= {handleShow}
        >New Event</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create A New Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EventsForm handleClose={handleClose} organization_id={props.organization_id}/>
          </Modal.Body>
        </Modal>
        </div>
    )
}


export default withAuthenticationRequired(CreateEvent, {
    onRedirecting: () => <Loading />,
  });