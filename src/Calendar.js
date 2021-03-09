import React from 'react'
import Loading from './components/loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Calendarblock from './components/Calendarblock'
import NavBar from './components/NavBar.js';

const Calendar = props => { 
    // return (<ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today}
    // eventSettings={{ dataSource: props.calendarEvents }}>
    //   <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    //   </ScheduleComponent>)
            return (
            <div>
              {/* TODO: Announcements bar */}
              <NavBar />
              {props.orgNames ? <Calendarblock calendarEvents={props.calendarEvents} orgNames={props.orgNames}/> : <Loading />}
            </div>
          )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});