import React from 'react';
import './App.css';
import  Calendar  from './components/Calendar'
import  Home  from './components/Home'
import  Clubs from './components/Clubs'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './components/About';
import Features from './Features';
import Contact from './Contact';
// import GlobalFonts from './fonts/fonts';

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'http://team-vision-cs178.herokuapp.com/api/'

class App extends React.Component {
  constructor() {
    super();
    if(window.localStorage.getItem("username") === null) { //making a hash(unique username)
      const crypto = require("crypto");
      const id = crypto.randomBytes(16).toString("hex");
      localStorage.setItem("username", id);
    }

    let cachedEvents = localStorage.getItem("calendarEvents");
    if(cachedEvents === null) {
      // cached calendar events does not exist, make empty.
      localStorage.setItem("calendarEvents", [])
    }
    // have username and current known schedule in a cache.
    this.state = {
      calendarEvents: []
    }
  }

  fetchEvents = () => {
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
          this.setState({calendarEvents: newEvents})
      })
      .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchEvents();
  }
  render() {
    return (
    <Router>
      <div>
        {/* <GlobalFonts /> */}
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/clubs">Clubs</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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
            <Calendar calendarEvents={this.state.calendarEvents} />
          </Route>
          <Route path="/clubs">
            <Clubs action={this.fetchEvents} />
          </Route>
          <Route path="/*" component={NoMatch} />
        </Switch>
      </div>
    </Router>
    )
    
  }
  
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

export default App;
