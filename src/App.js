import React, { useState, useEffect } from 'react';
import './App.css';
import  Calendar  from './Calendar'
import  Home  from './Home'
import Loading from './components/loading';
import Profile from './components/profile';
import JoinOrganization from './components/JoinOrganization';
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import {
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route'
import About from './About';
import Features from './Features';
import Contact from './Contact';
import Header from './components/Header';
import NavBar from './components/NavBar';
import OrganizationProfile from './components/OrganizationProfile'


/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState([])
  const [myOrgs, setMyOrgs] = useState({})
  const { isAuthenticated, isLoading, getAccessTokenSilently, user  } = useAuth0();

  //for createEvent
  const [delegatedOrgs, setDelegatedOrgs] = useState({});

  useEffect(() => {
    const fetchEvents = async (orgDict) => {
      try {
      const token = await getAccessTokenSilently();
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`)
      fetch( API + "getCalendarInfo?" + new URLSearchParams({name: user.name}), {
        method: 'GET',
        headers: myHeaders,
      }).then(res => res.json())
        .then(data => {
          let newEvents = []
          let newOrgs = []
          for(let i in data.organizations){
            newOrgs[i] = data.organizations[i];
            let currentOrgObject = data.organizations[i]
            for(let j in currentOrgObject.org_events) {
                currentOrgObject.org_events[j]["title"] = currentOrgObject.org_name + " - " + currentOrgObject.org_events[j]["title"];

                currentOrgObject.org_events[j]["start"] = eval("new Date(currentOrgObject.org_events[j]['start'])");
                currentOrgObject.org_events[j]["end"] = eval("new Date(currentOrgObject.org_events[j]['end'])");
                newEvents.push(currentOrgObject.org_events[j])
            }
          }
            setDelegatedOrgs(data.delegator_list); //this will end up being a hashmap of <orgHash> : <orgName>
            setCalendarEvents(newEvents)
            setMyOrgs(newOrgs)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents();
  }, [isAuthenticated, getAccessTokenSilently])

    return (
      <div>
        {isLoading ? <Loading /> : <>
        <Header />
        <NavBar />
        {/* <GlobalFonts /> */}
        <Switch>
          <Route exact path="/">
            {(isAuthenticated) ? <Calendar calendarEvents={calendarEvents} orgNames={myOrgs} /> : <Home />}
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
          <Route exact path="/calendar">
            <Calendar calendarEvents={calendarEvents} orgNames={myOrgs} />
          </Route>
          <Route exact path="/organizations">
          {/* pass delegatedOrgs as props to this component */}
            <OrganizationProfile delegatedOrgs={delegatedOrgs} orgNames={myOrgs} />
          </Route>
          <Route exact path="/join/:id" render={(props) => <JoinOrganization {...props} /> } />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route path="/*" component={NoMatch} />
        </Switch>
        </>
        }
      </div>
    )
};

const NoMatch = ({ location }) => {
  return (
    <div>
      <h3>
        404 - No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default withAuth0(App);
