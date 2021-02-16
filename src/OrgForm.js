import React from 'react';
import ReactDOM from 'react-dom';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from './components/loading';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const daysOfWk = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' 
]
const API = "https://team-vision-cs178.herokuapp.com/api/";

const OrgForm = () => {
  const { getAccessTokenSilently } = useAuth0();

  return (
  <div>
    <h2>Create your own Organization</h2>

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
        <h4>Organization Name</h4>
      <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
      {/* {errors.name} */}
      <ErrorMessage name="name" component="span" />
      <h4>Organization Description</h4>
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <h4> Meeting Times</h4>
      { daysOfWk.map((val, i) =>{
        return (<label key={i}>
          <Field type="checkbox" name="day" value={val} />
        {val}
        </label>)
      }) }
      <button type="submit" disabled={isSubmitting}>Submit</button>
      </Form>
      )}
    </Formik>
  </div>
  )
}

export default withAuthenticationRequired(OrgForm, {
  onRedirecting: () => <Loading />,
});