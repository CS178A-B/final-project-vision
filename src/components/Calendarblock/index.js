import React from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';


class Calendarblock extends React.Component {
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
          <div>
              <h1> C A L E N D A R </h1>
              <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={this.today} eventSettings={{ dataSource: this.props.calendarEvents }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              </ScheduleComponent>
          </div>
        </LeftGroup>
        <div>
        <RightGroup>
        <h2 style={{ textDecoration: 'underline' }}>O R G A N I Z A T I O N S</h2>
        {/* <Organizations /> */}
            <br/><br/><br/><br/><br/><br/>
            <DownloadButton
              text="Download .ics file"
              bgColor="white"
              />
        </RightGroup>
        </div>
      </Wrapper>
    );
  }
}

export default Calendarblock;