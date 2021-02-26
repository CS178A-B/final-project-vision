import React from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../loading';
import { Wrapper, HeadingText, NameInput, DescriptionInput, Section, FormTitle } from './styled';
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]
const API = "https://team-vision-cs178.herokuapp.com/api/";

const OrgForm = ({ toggle }) => {
  const { getAccessTokenSilently } = useAuth0();

  return (
  <Wrapper>
    <div>
      <FormTitle>Create your own Organization</FormTitle>
    </div>

    <Formik
      initialValues={{
        name: '',
        description: '',
        day: [],
        start: '',
        end: '',
        dues: '',
        pageLink: '',
        uploadImg: '',
      }}

      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }

        return errors;
      }}

      onSubmit ={ async values =>{
        try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgName = values.name;
        const data = new FormData();
        data.append("organization", orgName);
        // call api to add calendar events
        fetch(API + "createOrganization", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then(console.log("New organization added:" + orgName))
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
        <Section>
          <HeadingText>Organization Name</HeadingText>
          <NameInput type="text" name="name" onChange={handleChange}/>
          {/* {errors.name} */}
          <ErrorMessage name="name" component="span" style={{color: "red"}} />
        </Section>
        <Section>
          <HeadingText>Organization Description</HeadingText>
          {/* <DescriptionInput type="text" name="description" onChange={handleChange} /> */}
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
        </Section>
      </Form>
      )}
    </Formik>
  </Wrapper>
  )
}

export default withAuthenticationRequired(OrgForm, {
  onRedirecting: () => <Loading />,
});