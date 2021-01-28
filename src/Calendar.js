import React from 'react'
import Loading from './components/loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";
import NavbarUser from './components/NavbarUser';
import Calendarblock from './components/Calendarblock'

const Calendar = props => { 
    // return (<ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today}
    // eventSettings={{ dataSource: props.calendarEvents }}>
    //   <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    //   </ScheduleComponent>)
            return (
            <div>
              {/* TODO: Announcements bar */}
              <NavbarUser />
              <Calendarblock calendarEvents={props.calendarEvents} orgNames={props.orgNames}/>
            </div>
          )
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});