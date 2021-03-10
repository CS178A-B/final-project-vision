import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../loading';
import { Wrapper, HeadingText, NameInput, DescriptionInput, Section, FormTitle, StartInput, EndInput } from './styled';
import ReactForm from 'react-bootstrap/Form';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import '../../styles.css';

const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]
const API = "https://team-vision-cs178.herokuapp.com/api/";

const EventsForm = (props) => {
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const handleClose = props.handleClose;
  const [valueS, onChangeS] = useState(new Date());
  const [valueE, onChangeE] = useState(new Date());

  return (
  <>
    {/* <div>
      <FormTitle>Add events</FormTitle>
    </div> */}

    <Formik
      initialValues={{
        title: '',
        start: '',
        end: '',
        allDay: 'false',
        desc: ''
        }}

      validate = { values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        return errors;
      }}

      onSubmit = { async values => {
        try {
        console.log("in submit")
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgID = props.organization_id;
        const data = new FormData()
        data.append("organization_id", orgID)
        data.append("title", values.title)
        data.append("desc", values.desc)
        data.append("start", valueS)
        data.append("end", valueE)
        data.append("allDay", values.allDay)

        // call api to add calendar events
        fetch(API + "createEvent", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then((res) => res.json())
        .then(() => {
          history.push('/calendar')
          window.location.reload(false)
         } )
        }
        catch (error) {
            console.log(error)
        }
    }}

>
      {({ handleChange, isSubmitting}) => (
      <Form>
        <ReactForm.Group>
          <ReactForm.Label>Event Title</ReactForm.Label>
          <ReactForm.Control type="text" name="title" onChange={handleChange}/>
          <ErrorMessage name="title" component="span" style={{color: "red"}} />
        </ReactForm.Group>
        <ReactForm.Group controlId="exampleForm.ControlTextarea1">
          <ReactForm.Label>Description</ReactForm.Label>
          <ReactForm.Control name="desc" as="textarea" rows={3} style={{ resize: "none"}}/>
        </ReactForm.Group>
        <ReactForm.Group>
          <Container>
          <ReactForm.Row>
            <ReactForm.Row>
              <Col md={{ span: 3, offset: 1}}>
                <ReactForm.Label style={{ width: "50px" }}>Start</ReactForm.Label>
              </Col>
              <Col md={{ span: 4 }}>
              <DateTimePicker onChange={onChangeS}
        value={valueS} style={{ borderRadius: "5px" }}/>
              </Col>
            </ReactForm.Row>
            <ReactForm.Row>
              <Col md={{ span: 3, offset: 1}}>
                <ReactForm.Label style={{ width: "50px" }}>End</ReactForm.Label>
              </Col>
              <Col md={{ span: 4 }}>
              <DateTimePicker onChange={onChangeE}
        value={valueE}/>
              </Col>
            </ReactForm.Row>  
          </ReactForm.Row>
          </Container>
        </ReactForm.Group>
        <ButtonGroup style={{ float: "right", borderRadius: "20px"}}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: "5px", marginRight: "10px"}}>
            Cancel
          </Button>{' '}
          <Button variant="success" type="submit" disabled={isSubmitting} style={{ borderRadius: "5px" }}>
            Create
        </Button>
        </ButtonGroup>
      </Form>
      )}
    </Formik>
  </>
  )
}

export default withAuthenticationRequired(EventsForm, {
  onRedirecting: () => <Loading />,
});