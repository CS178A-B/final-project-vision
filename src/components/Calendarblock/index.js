import React, { useState } from 'react';
import DownloadButton from '../DownloadButton';
import { Wrapper } from './styled';
import { LeftGroup, RightGroup } from './styled';
import { Calendar, momentLocalizer, Views  } from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import OrganizationsBlock from '../Organizationblock';
import OrgForm from '../Orgform';
import { buttonColor } from '../colors';
import events from '../../mock_data/events';

const localizer = momentLocalizer(moment)

const Calendarblock = props => {
  // const [value,setValue] = useState('Vision')
  const today = new Date()
  const [showPopup,togglePopup] = useState(false)
  let allViews = Object.keys(Views).map(k => Views[k])
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // }

  // const handleSubmit = (event) => {
  //   alert('Select an organization: ' + value);
  //   event.preventDefault();
  // }

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

    const togglePop = () => {
      togglePopup(!showPopup)
    };

    return(
      <Wrapper>
        <Calendar
        views={allViews}
        events={props.calendarEvents}
        localizer={localizer}
        step={60}
        showMultiDayTimes
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        defaultDate={today}
        />
        <OrganizationsBlock orgNames={props.orgNames}/>
        {/* <div>
        <button onClick={togglePop} style={{ backgroundColor: buttonColor.Green }} >Add Organization</button>

        {showPopup ? <OrgForm toggle={togglePop} /> : null}
        {true ? <OrgForm toggle={togglePop} /> : null}
        </div>
        <DownloadButton
            text="Download .ics file"
            bgColor="white"
            /> */}
    </Wrapper>
  );
}

export default Calendarblock;