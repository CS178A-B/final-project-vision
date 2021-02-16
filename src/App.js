import React, { useState, useEffect } from 'react';
import './App.css';
import  Calendar  from './Calendar'
import  Home  from './Home'
import Loading from './components/loading';
import Profile from './components/profile';
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import  Organizations from './Organizations'
import {
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route'
import About from './About';
import Features from './Features';
import Contact from './Contact';
import OrgForm from './OrgForm';

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState(null)
  const [orgNames, setOrgNames] = useState(null)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const {isLoading} = props.auth0;


  const fetchEvents = async () => {
    try {
    const token = await getAccessTokenSilently();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    fetch( API + "getCalendarInfo", {
      method: 'GET',
      headers: myHeaders,
    }).then(res => res.json())
      .then(data => {
        let newEvents = []
        let tempOrgs = []
        for(let orgName in data){
          tempOrgs.push(orgName)
          for(let temp in data[orgName]) {
              data[orgName][temp]["Subject"] = orgName + " - " + data[orgName][temp]["Subject"];
              newEvents.push(data[orgName][temp])
          }
        }
          setCalendarEvents(newEvents)
          setOrgNames(tempOrgs)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [isAuthenticated])

  if (isLoading) {
    return <Loading />
  }


    return (
      <div>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/features">
            <Features />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path = "/createorg">
            <OrgForm />
          </Route>
          <Route path="/calendar">
            {calendarEvents!== null ? <Calendar calendarEvents={calendarEvents} orgNames={orgNames} /> : <Loading />}
          </Route>
          <Route path="/organizations">
    {orgNames!==null ? <Organizations action={fetchEvents} myOrgs={orgNames} /> : <Loading/> }
          </Route>
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/*" component={NoMatch} />
        </Switch>
    </div>
    )
};

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        404 - No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default withAuth0(App);
