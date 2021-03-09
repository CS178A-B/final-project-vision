import React, { useState } from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import OrganizationsBlock from '../Organizationblock';
import OrgForm from '../Orgform';
import { buttonColor } from '../colors';


const localizer = momentLocalizer(moment)

const Calendarblock = props => {
  // const [value,setValue] = useState('Vision')
  const today = new Date()
  const [showPopup,togglePopup] = useState(false)

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // }

  // const handleSubmit = (event) => {
  //   alert('Select an organization: ' + value);
  //   event.preventDefault();
  // }

    const togglePop = () => {
      togglePopup(!showPopup)
    };

    return(
      <Wrapper>
      <LeftGroup>
        <div>
          <h3> Calendar </h3>
        </div>
      </LeftGroup>
      <RightGroup>
        <OrganizationsBlock orgNames={props.orgNames}/>
        <div>
        <button onClick={togglePop} style={{ backgroundColor: buttonColor.Green }} >Add Organization</button>

        {showPopup ? <OrgForm toggle={togglePop} /> : null}
        {/* {true ? <OrgForm toggle={togglePop} /> : null} */}
        </div>
        <DownloadButton
            text="Download .ics file"
            bgColor="white"
            />
      </RightGroup>
    </Wrapper>
  );
}

export default Calendarblock;