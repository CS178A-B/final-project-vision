import React, { useState, useEffect } from 'react';
import './App.css';
import  Calendar  from './components/Calendar'
import  Home  from './components/Home'
import  Clubs from './components/Clubs'
import Loading from './components/loading';
import Profile from './components/profile';
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route'
import About from './components/About';
import Features from './Features';
import Contact from './Contact';
// import GlobalFonts from './fonts/fonts';

/** COMMENT DURING PROD **/
const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
// const API = 'http://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState([])
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const {isLoading} = props.auth0;


  const fetchEvents = async () => {
    try {
    const token = await getAccessTokenSilently();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`)
    fetch( API + "getCalendarInfo", {
      method: 'POST',
      headers: myHeaders,
    }).then(res => res.json())
      .then(data => {
        let newEvents = []
          const orgs = data.organizations;
          let orgsSeen = {}
          for(let orgIdx in orgs) {
            for(let orgName in orgs[orgIdx]) {
              //TODO TEMPORARY MEASURE TO AVOID DUPLICATES (  NEED TO MAKE CHANGE ON THE DATABASE TO NOT ALLOW DUPLICATE CLUB JOINS)
              if(orgsSeen[orgName] === undefined) {
                for(let eventIdx in orgs[orgIdx][orgName] ) {
                    //TODO add orgName to title of each event in Database, Ex:  "General Meeting" -> "Chess Club - General Meeting"
                  orgs[orgIdx][orgName][eventIdx]["Subject"] = orgName + " - " + orgs[orgIdx][orgName][eventIdx]["Subject"];
                    newEvents.push(orgs[orgIdx][orgName][eventIdx])
                }
             } orgsSeen[orgName] = true;

            }
          }
          delete newEvents["json"] // post process and delete the unnecessary field
          setCalendarEvents(newEvents)
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

  // const authLinks = () => {
  //   return !isAuthenticated ? <div></div> : <div>
  //           <li>
  //             <Link to="/calendar">Calendar</Link>
  //           </li>
  //           <li>
  //             <Link to="/profile">Profile</Link>
  //           </li>
  //           <li>
  //             <Link to="/clubs">Clubs</Link>
  //           </li>
  //         </div>
  // }

    return (
      <div>
        {/* <GlobalFonts /> */}
      {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authLinks()}
        </ul> */}
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
          <Route path="/calendar">
            <Calendar calendarEvents={calendarEvents} />
          </Route>
          <Route path="/clubs">
            <Clubs action={fetchEvents} />
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
