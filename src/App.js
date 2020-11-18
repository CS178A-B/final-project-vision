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

/** COMMENT DURING PROD **/
const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
// const PROD_API = 'http://team-vision-cs178.herokuapp.com/api/'

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
    console.log(cachedEvents)
    // have username and current known schedule in a cache.
    this.state = {
      calendarEvents: []
    }
  }

  componentDidMount() {
    const data = new FormData();
    data.append("username", localStorage.getItem("username"))
    fetch( API + "getCalendarInfo", {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(data => {
        let newEvents = []
        console.log(data)
          const orgs = data.organizations;
          for(let orgIdx in orgs) {
            for(let orgName in orgs[orgIdx]) {
              for(let eventIdx in orgs[orgIdx][orgName] ) {
                for(let currentEvent in orgs[orgIdx][orgName][eventIdx]) {
                  console.log(currentEvent)
                  newEvents.push(currentEvent)
                }
              }
            }
          }
          console.log(orgs[0]["ACM"][0])
          this.setState({calendarEvents: newEvents})
          console.log(this.state)
      })
      .catch(e => console.log(e))
  }
  render() {
    return ( 
    <Router>
      <div>
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
          <Route path="/calendar">
            <Calendar calendarEvents={this.state.calendarEvents} />
          </Route>
          <Route path="/clubs">
            <Clubs />
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
