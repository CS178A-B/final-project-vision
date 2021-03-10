import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../loading';
import { Wrapper, HeadingText, NameInput, DescriptionInput, Section, FormTitle } from './styled';
import ReactForm from 'react-bootstrap/Form';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap';
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]
const API = "https://team-vision-cs178.herokuapp.com/api/";

const OrgForm = ({ handleClose }) => {
  const { getAccessTokenSilently } = useAuth0();

  return (
  <>
    {/* <div>
      <FormTitle>Create your own Organization</FormTitle>
    </div> */}

    <Formik
      initialValues={{
        name: '',
        description: '',
        hash: '',
      }}

      validate = { values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }

        return errors;
      }}

      onSubmit = { async values => {
        try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgName = values.name;
        const orgDescription = values.description;
        const data = new FormData();
        data.append("organization", orgName);
        data.append("org_description", orgDescription);
        // data.append("public_true_or_false", )
        // call api to add calendar events
        fetch(API + "createOrganization", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then( res => res.json())
        .then(res => {
          console.log("https://team-vision.heroku.com/join/" + res.newOrgHash)
          values.hash = res.newOrgHash
        })
        .then(() => {
          console.log("New organization added:" + orgName)
          console.log("New organization desciption:" + orgDescription)
        })
        // .then(window.location.reload(false))
        // .then(res => {
          // console.log("team-vision.heroku.com/join/" + res["newOrgHash"]);
        // console.log("RES ONLY:" + res)
      // }) // + res.newOrgHash))
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
          <ReactForm.Label>Name</ReactForm.Label>
          <ReactForm.Control type="text" name="name" onChange={handleChange}/>
          <ErrorMessage name="name" component="span" style={{color: "red"}} />
        </ReactForm.Group>
        <ReactForm.Group controlId="exampleForm.ControlTextarea1">
          <ReactForm.Label>Description</ReactForm.Label>
          <ReactForm.Control onChange={handleChange} name="description" as="textarea" rows={3} style={{ resize: "none"}}/>
        </ReactForm.Group>

        <ButtonGroup style={{ float: "right", borderRadius: "20px"}}>
        <Button variant="outline-secondary" onClick={handleClose} style={{ borderRadius: "5px", marginRight: "10px"}}>
            Cancel
          </Button>{' '}
          <Button variant="success" type="submit" disabled={isSubmitting} style={{ borderRadius: "5px" }}>
            Create
        </Button>
        </ButtonGroup>
        
        {/* <button className="bt-success"type="submit" disabled={isSubmitting}>Submit</button> */}

        {/* <Section>
          <HeadingText>Organization Name</HeadingText>
          <NameInput type="text" name="name" onChange={handleChange}/>
          // {errors.name}
          <ErrorMessage name="name" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <HeadingText>Organization Description</HeadingText>
          // <DescriptionInput type="text" name="description" onChange={handleChange} /> 
          <DescriptionInput name="description"></DescriptionInput>
        </Section>
        <Section>
          <HeadingText> Meeting Times</HeadingText>
          { daysOfWk.map((val, i) =>{
            return (<label key={i}>
              <Field type="checkbox" name="day" value={val} />
            {val}
            </label>)
          }) }
        </Section>
        <Section>
          <button type="reset" onClick={toggle}>Cancel</button>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Section> */}
      </Form>
      )}
    </Formik>
  </>
  )
}

export default withAuthenticationRequired(OrgForm, {
  onRedirecting: () => <Loading />,
});