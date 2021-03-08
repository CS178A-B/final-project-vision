import React from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import OrganizationsBlock from '../Organizationblock';

const localizer = momentLocalizer(moment)

const Calendarblock = props => {

    return(
      <Wrapper>
        <LeftGroup>
          <div>
              <h1> C A L E N D A R </h1>
              <Calendar
                localizer={localizer}
                events={props.calendarEvents}
                startAccessor="start"
                endAccessor="end"
              />
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