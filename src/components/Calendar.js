import React from 'react'
import DataSource from '../mock_data/datasource.json';
import Navbar from '../components/Navbar';
import Calendarblock from './Calendarblock'

class Calendar extends React.Component { 
  schData = DataSource.scheduleData
  constructor() {
    super()
    this.scheduleObj = React.createRef();
  }
    today = new Date();

    render() {
            return (
            <div>
              {/* TODO: Announcements bar */}
              <Navbar />
              <Calendarblock />
          </div>
            );
    }
}

export default Calendar;