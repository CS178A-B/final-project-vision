import React from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule';
import OrganizationsBlock from '../Organizationblock';


const Calendarblock = props => {
    // const [value,setValue] = useState('Vision')
    const today = new Date()

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // }

  // const handleSubmit = (event) => {
  //   alert('Select an organization: ' + value);
  //   event.preventDefault();
  // }
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
        <OrganizationsBlock orgNames={props.orgNames}/>
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