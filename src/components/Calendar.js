import React from 'react'
import DataSource from '../mock_data/datasource.json';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
class Calendar extends React.Component { 
    schData = DataSource.scheduleData
    today = new Date();
    render() {
            return <ScheduleComponent currentView='Month' selectedDate={this.today}
    eventSettings={{ dataSource: this.schData }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    }
}

export default Calendar;