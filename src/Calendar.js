import React from 'react'
import Loading from './components/loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Calendarblock from './components/Calendarblock'

const Calendar = props => { 
  return (
    <Calendarblock orgNames={props.orgNames}/>
  )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});