import React, { useState } from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';


const Calendarblock = props => {
    const [value,setValue] = useState('Vision')
    const today = new Date()

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  console.log("in calendar block")

  const handleSubmit = (event) => {
    alert('Select an organization: ' + value);
    event.preventDefault();
  }
    return(
      <Wrapper>
        <LeftGroup>
          <div>
              <h1> C A L E N D A R </h1>
              <ScheduleComponent enablePersistence={true} currentView='Month' selectedDate={today} eventSettings={{ dataSource: props.calendarEvents }}>
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

export default Calendarblock;