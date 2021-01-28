import React from 'react'
import Loading from './loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Navbar from '../components/Navbar';
import Calendarblock from './Calendarblock'

const Calendar = props => { 
    // return (<ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today}
    // eventSettings={{ dataSource: props.calendarEvents }}>
    //   <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    //   </ScheduleComponent>)
            return (
            <div>
              {/* TODO: Announcements bar */}
              <Navbar />
              <Calendarblock calendarEvents={props.calendarEvents}/>
            </div>
          )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});