import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../loading';
import { Wrapper, HeadingText, NameInput, DescriptionInput, Section, FormTitle, StartInput, EndInput } from './styled';
import ReactForm from 'react-bootstrap/Form';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import DateTimePicker from 'react-datetime-picker';
import '../../styles.css';

const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]
const API = "https://team-vision-cs178.herokuapp.com/api/";

const EventsForm = (props) => {
  console.log(props)
  console.log(new Date(2021, 2, 1))
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
        if (!values.desc) {
            errors.desc = 'Required';
        }
        if (!values.start) {
            errors.start = 'Required';
        }
        if (!values.end) {
            errors.end = 'Required';
        }
        return errors;
      }}

      onSubmit = { async values => {
        try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgID = props.organization_id;
        const data = new FormData()
        data.append("organization_id", orgID)
        data.append("title", values.title)
        data.append("desc", values.desc)
        // data.append("start", values.start)
        // data.append("end", values.end)
        data.append("allDay", values.allDay)

                console.log(values.allDay)

        data.append("start", (new Date(2021, 2, 3).toString()))
        data.append("end", (new Date(2021, 2, 4).toString()))

        // call api to add calendar events
        fetch(API + "createEvent", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then((res) => res.json())
        .then((res) => console.log(res))
        }
        catch (error) {
            console.log(error)
        }
    }}

      // onSubmit={(values) => console.log(values)
      // }
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
          {/* <Row>
            <Col>
              <TimePicker start="00:00" end="24:00" step={30} placeholder="Start"/>
            </Col>
            <Col>
              <TimePicker start="00:00" end="24:00" step={30} placeholder="End"/>
            </Col>
          </Row> */}
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
        {/* <ReactForm.Row>
          <ReactForm.Group as={Col} controlId="formGridStart">
            <ReactForm.Label style={{ width: "40px" }}>Start</ReactForm.Label>
            <div>
            <ReactForm.Label>End</ReactForm.Label>
            </div>
            // <DateTimePicker disableClock="false" onChange={onChangeS} value={valueS}/>
          </ReactForm.Group>

          <ReactForm.Group as={Col} controlId="formGridEnd">
            // <ReactForm.Label>End</ReactForm.Label>
            <DateTimePicker disableClock="false" onChange={onChangeS} value={valueS}/>
            <DateTimePicker disableClock="false" onChange={onChangeE} value={valueE}/>
          </ReactForm.Group>
        </ReactForm.Row> */}
        
        {console.log(valueS)}
        {console.log(valueE)}


        <ButtonGroup style={{ float: "right", borderRadius: "20px"}}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: "5px", marginRight: "10px"}}>
            Cancel
          </Button>{' '}
          <Button variant="success" type="submit" disabled={isSubmitting} style={{ borderRadius: "5px" }}>
            Create
        </Button>
        </ButtonGroup>

        {/* <Section>
          <HeadingText>Event Title</HeadingText>
          <NameInput type="text" name="title" onChange={handleChange}/>
          // {errors.name} 
          <ErrorMessage name="title" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <HeadingText>Event Description</HeadingText>
          // <DescriptionInput type="text" name="description" onChange={handleChange} /> 
          <DescriptionInput type="text" name="desc" onChange={handleChange}></DescriptionInput>
           <ErrorMessage name="desc" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <HeadingText> Event Start</HeadingText>
          <StartInput type="text" name="start" onChange={handleChange}></StartInput>
          <ErrorMessage name="start" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <HeadingText> Event End</HeadingText>
          <EndInput type="text" name="end" onChange={handleChange}></EndInput>
          <ErrorMessage name="end" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <button type="reset" onClick={props.closeHandle}>Cancel</button>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Section> */}
      </Form>
      )}
    </Formik>
  </>
  )
}

export default withAuthenticationRequired(EventsForm, {
  onRedirecting: () => <Loading />,
});