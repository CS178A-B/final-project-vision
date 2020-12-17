import React from 'react'
import DataSource from '../mock_data/datasource.json';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';
import Loading from './loading.js';
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Calendar = props => { 
    const today = new Date();

    return (<ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today}
    eventSettings={{ dataSource: props.calendarEvents }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>)
}

export default withAuthenticationRequired(Calendar, {
  onRedirecting: () => <Loading />,
});