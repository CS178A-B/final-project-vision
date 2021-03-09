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


/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState(null)
  const [orgNames, setOrgNames] = useState(null)
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const fetchOrgNames = async () => {
    try {
      const token = await getAccessTokenSilently();
      localStorage.setItem('token', token);
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`)
      fetch( API + "getListOfOrganizations", {
      method: 'GET',
      headers: myHeaders,
    }).then(res => res.json())
      .then( res => fetchEvents(res))
    } catch (error) {
      console.log(error)
    }
  }

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
        // let newEvents = []
        let tempOrgs =  []
        for(let orgName in data){
          // console.log(orgName + ": " + orgDict[orgName]);
          // tempOrgs[orgName] = orgDict[orgName]
          // for(let temp in data[orgName]) {
          //     data[orgName][temp]["Subject"] = orgName + " - " + data[orgName][temp]["Subject"];
          //     newEvents.push(data[orgName][temp])
          // }
        }
          // setCalendarEvents(newEvents)
          setCalendarEvents([])
          setOrgNames(tempOrgs)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrgNames();
  }, [isAuthenticated])

  if (isLoading) {
    return <Loading />
  }


    return (
      <div>
        <Header />
        {/* <GlobalFonts /> */}
        <Switch>
          <Route exact path="/">
            {(isLoading) ? <Loading /> : <Home />}
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
            {(!isLoading) ? <Calendar calendarEvents={calendarEvents} orgNames={orgNames} /> : <Loading />}
          </Route>
          <Route exact path="/organizations">
            {orgNames!==null ? <div> In organizations page</div>  : <Loading/> }
          </Route>
          <Route exact path="/join/:id" render={(props) => <JoinOrganization {...props} /> } />
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
