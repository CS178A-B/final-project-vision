import React from 'react';
import ReactDOM from "react-dom";
import DataSource from '../../mock_data/datasource.json';
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
          <div className="Calendar" style={{ width: 1300, height: 680, position: 'fixed', bottom: '0' }}>
              <h1> C A L E N D A R </h1>
              <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={this.today} eventSettings={{ dataSource: this.props.calendarEvents }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
          </div>
        </LeftGroup>
        <RightGroup>
        <h2 style={{ textDecoration: 'underline' }}>ORGANIZATIONS</h2>
        <label>
          Select an organization:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="vision">Vision</option>
            <option value="rocket">Rocket</option>
            <option value="lakers">Lakers</option>
            <option value="warrior">Warriors</option>
          </select>
              <br/>
              <br/>
                  <br/>

    <br/>

    <br/>

    <br/>


        </label>
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