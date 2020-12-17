import React from 'react'
import DataSource from '../mock_data/datasource.json';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';

const Calendar = props => { 
    const schData = DataSource.scheduleData
    const scheduleObj = React.createRef();
    const today = new Date();

    let content = (<ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today}
    eventSettings={{ dataSource: props.calendarEvents }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>)
    return content;
}

export default Calendar;