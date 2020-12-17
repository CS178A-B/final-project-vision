import React, { useState } from 'react';
import './App.css';
import  Calendar  from './components/Calendar'
import  Home  from './components/Home'
import  Clubs from './components/Clubs'
import Loading from './components/loading';
import { withAuth0 } from "@auth0/auth0-react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProtectedRoute from './auth/protected-route'

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


// domain: dev-a49dxbp1.us.auth0.com
// client-id: 7SIW4mZlvPXM2uTUGa1oHiZL6BueAcOv
// client secret: bvov3TiE_Vi96wHwEaEutxZKcS3vg0ZM6PJ1roPPDZrb2W9AsFyu2-xtz7rF5855


/** UNCOMMENT DURING PROD **/ 
const API = 'http://team-vision-cs178.herokuapp.com/api/'

const App = props => {
  // const [state, setState] = useState({
  //   calendarEvents: []
  // });
  const [calendarEvents, setCalendarEvents] = useState([])
  const {isLoading} = props.auth0;
  if (isLoading) {
    return <Loading />
  }


  const fetchEvents = () => {
    const data = new FormData();
    data.append("username", localStorage.getItem("username"))
    fetch( API + "getCalendarInfo", {
      method: 'POST',
      body: data
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
      .catch(e => console.log(e))
  }

    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/clubs">Clubs</Link>
          </li><li>
            <Link to="/about">Clubs</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/" exact component={Home} />
          <ProtectedRoute path="/calendar" component={Calendar} />
          <Route path="/clubs">
            <Clubs action={fetchEvents} />
          </Route>
          {/* <ProtectedRoute path="/profile" component={Profile} /> */}
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
