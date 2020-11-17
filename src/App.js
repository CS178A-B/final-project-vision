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

class App extends React.Component {

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
            <Calendar />
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
