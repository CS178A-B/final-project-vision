import React, { useState } from 'react'
import Loading from './components/loading.js';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Calendarblock from './components/Calendarblock'
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup, Modal, Radio, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './components/SIGNIN.css';
import './styles.css';
import Orgform from './components/Orgform/index.js';

const API = "https://team-vision-cs178.herokuapp.com/api/";
const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]

const Calendar = props => { 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { getAccessTokenSilently } = useAuth0();

  onsubmit = async (values) => {
    try {
    const token = await getAccessTokenSilently();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    const orgName = values.name;
    const data = new FormData();
    data.append("organization", orgName);
    // data.append("public_true_or_false", )
    // call api to add calendar events
    fetch(API + "createOrganization", {
        method: 'POST',
        headers: myHeaders,
        body: data,
    }).then( res => res.json())
    .then(res => console.log(res))
    .then(console.log("New organization added:" + orgName))
    .then(res => console.log("team-vision.heroku.com/join/newOrgHash")) // + res.newOrgHash))
    }
    catch (error) {
        console.log(error)
    }
  }

  // const [value, setValue] = React.useState(["Yes", "No"]);
  // const handleRadio = val => setValue(val);

  return (
    <>
    {console.log(props.calendarEvents)}
    <Calendarblock calendarEvents={props.calendarEvents} orgNames={props.orgNames}/>

    <Button variant="outline-warning" onClick={handleShow} style={{ borderRadius: "10px" }}>
        Create New
    </Button>


    <Modal className="createOrgModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Orgform handleClose={handleClose}/>
          {/* <Form onSubmit={createOrgSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="input"/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} style={{ resize: "none"}}/>
            </Form.Group> */}
            {/* <Form.Group>
              <Form.Label>Meeting Times</Form.Label>
              {/* <Form.Control as="select" multiple>
                {[daysOfWk].map((day, i) => (
                  <option key={i}>{day}</option>
                ))}
              // </Form.Control>
              <InputGroup className="mb-3">
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title="Day"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item>None</Dropdown.Item>
                  {/* {[daysOfWk].map((day, i) => (
                  <Dropdown.Item key={i}>{day}</Dropdown.Item>
                // ))} 
                  <Dropdown.Divider />
                  <Dropdown.Item>Sunday</Dropdown.Item>
                  <Dropdown.Item>Monday</Dropdown.Item>
                  <Dropdown.Item>Tuesday</Dropdown.Item>
                  <Dropdown.Item>Wednesday</Dropdown.Item>
                  <Dropdown.Item>Thursday</Dropdown.Item>
                  <Dropdown.Item>Friday</Dropdown.Item>
                  <Dropdown.Item>Saturday</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" placeholder="Comments" />
              </InputGroup>
              // <Form.Label>Recurring</Form.Label>{' '} 
              <Form.Check label="Recurring" type="radio" id="inline-radio" />
            </Form.Group>
            <Form.Group>
              // <Form.Label>Dues (if any)</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Dues (if any)"aria-label="Amount" />
                // <Form.Control type="input" placeholder="$"/>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.File id="orgImage" label="Upload Image" />
            </Form.Group> 
          </Form> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Create
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});