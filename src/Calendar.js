import React from 'react'
import Loading from './components/loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Calendarblock from './components/Calendarblock'
import NavBar from './components/NavBar.js';

const Calendar = props => { 
            return (
            <div>
              In calendar page
            </div>
          )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});