import React from 'react';
import { Block1, Block2, Block3, BlockContent, Content, ImageL, ImageS, MiniButtons, Title, Wrapper } from './styled';
import Calendar from '../assets/calendar.png';
import Group from '../assets/group.png';
import Task from '../assets/task.png';

class Featureblock extends React.Component {
  render() {
    return(
      <Wrapper style={{textAlign: 'center'}}>
        <div>
          <h3 style={{ textDecoration: 'underline', background: 'inherit'}}>Application Features</h3>
        </div>
        <Content>
          <Block1>
            <BlockContent>
              <Title>
                <h5>Calendar</h5>
              </Title>
              <ImageS src={Calendar} alt="CALENDAR" />
              <p>See all the groups you are apart of together and add their events into one calendar with multiple views</p>
              <p>Download your calendar into an .ics file in order to import to other platforms</p>
            </BlockContent>
          </Block1>
          <Block2>
            <BlockContent>
              <Title>
                <h5>Group Functionality</h5>
              </Title>
              <ImageL src={Group} alt="GROUP" />
              <div style={{display: 'flex'}}>
                <div style={{textAlign: 'left'}}>
                  <p>Find information such as:</p>
                  <li>General information</li>
                  <li>Meeting times</li>
                  <li>Dues, if any</li>
                  <li>Roles/Positions</li>
                  <p>for each group/organization</p>
                </div>
                <div>
                  <p>Create and manage groups or organizations and edit the information of each group with ease</p>
                  <p>Find and add organizations to your desire to your list</p>
                </div>
              </div>
            </BlockContent>
          </Block2>
          <Block3>
            <BlockContent>
              <Title>
                <h5>Task Manager</h5>
              </Title>
              <ImageS src={Task} alt="TASK" />
              <p>Create and assign tasks to those in your personalized groups and give them priorities based on a stoplight color system</p>
              <div style={{display: 'flex', justifyContent:'space-evenly'}}>
                <MiniButtons>Assign</MiniButtons>
                <MiniButtons>Create</MiniButtons>
              </div>
              <p>Sync tasks to your calendar as reminders</p>
              </BlockContent>
          </Block3>
        </Content>
      </Wrapper>
    );
  }
}

export default Featureblock;
