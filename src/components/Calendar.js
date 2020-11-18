import React from 'react'
import DataSource from '../mock_data/datasource.json';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';
class Calendar extends React.Component { 
  schData = DataSource.scheduleData
  constructor() {
    super()
    this.scheduleObj = React.createRef();
  }
    today = new Date();

    render() {
            return <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={this.today}
    eventSettings={{ dataSource: this.props.calendarEvents }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    }
}

export default Calendar;