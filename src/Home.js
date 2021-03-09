import React, { useState } from 'react';
import Homeblock from './components/Homeblock';
import NavBar from './components/NavBar';
import { Modal } from 'react-bootstrap';

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
        <Homeblock togglePop={handleToggle} />
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {/* <Sign /> */} hey
        </Modal.Body>
      </Modal>
      </div>
    );
}

export default Home;