import React from 'react';
import './App.css';
import DataSource from './datasource.json';

import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';

// import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';

class App extends React.Component {
  schData = DataSource.scheduleData;

  render() {
    return <ScheduleComponent currentView='Month' selectedDate={new Date(2019, 0, 6)}
    eventSettings={{ dataSource: this.schData }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
  }
};

export default App;
