import React from 'react';
import ReactDOM from "react-dom";
import DataSource from '../../mock_data/datasource.json';
import Clubs from '../Clubs.js';
import LargeButton from '../LargeButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';


class Calendarblock extends React.Component {
  // schData = DataSource.scheduleData
  // constructor() {
  //   super()
  //   this.scheduleObj = React.createRef();
  // }
  //   today = new Date();

  constructor(props) {
    super(props);
    this.state = {value: 'Vision'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Select an organization: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <Wrapper>
        <LeftGroup>
          <div className="Calendar" style={{ width: 1300, height: 700, position: 'fixed', bottom: '0' }}>
              <h1> C A L E N D A R </h1>
              <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={this.today} eventSettings={{ dataSource: this.props.calendarEvents }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
          </div>
        </LeftGroup>
        <RightGroup>
        <h2 style={{ textDecoration: 'underline' }}>O R G A N I Z A T I O N S</h2>
        <Clubs />
            <br/><br/><br/><br/><br/><br/>
            <LargeButton
              text="Download .ics file"
              bgColor="white"
              />
        </RightGroup>
      </Wrapper>
    );
  }
}

export default Calendarblock;