import React from 'react'
import DataSource from '../mock_data/datasource.json';
import Navbar from '../components/Navbar';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';
class Calendar extends React.Component { 
  schData = DataSource.scheduleData
  constructor() {
    super()
    this.scheduleObj = React.createRef();
  }
    today = new Date();

    render() {
            return <div className="Calendar">
            <Navbar />
            <h1 style = {Styles.container}> C A L E N D A R </h1>
            <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={this.today} eventSettings={{ dataSource: this.props.calendarEvents }}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
            </div>
    }
}
const Styles = {
    container: {
        backgroundColor: '#8ecae6',
        height: '50px'
    },

    title: {
        fontSize: '12px'
    }
};

export default Calendar;