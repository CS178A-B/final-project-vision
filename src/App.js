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


/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState(null)
  const [myOrgs, setmyOrgs] = useState(null)
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    const fetchEvents = async (orgDict) => {
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
          let orgList = []
          for(let i in data.organizations){
            let currentOrgObject = data.organizations[i]
            orgList.push(currentOrgObject);
            for(let j in currentOrgObject.org_events) {
                currentOrgObject.org_events[j]["Subject"] = currentOrgObject.org_name + " - " + currentOrgObject.org_events[j]["Subject"];
                newEvents.push(currentOrgObject.org_events[j])
            }
          }
            setCalendarEvents(newEvents)
            setmyOrgs(orgList)
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
            {(isAuthenticated) ? <Calendar /> : <Home />}
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
            <div> In organizations page</div>
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
