import React from 'react';
import { Block, BlockContent, BlockHeader, Content, Image, MiniButtons, Text, Title, Wrapper } from './styled';
import Calendar from '../assets/calendar.png';
import Group from '../assets/group.png';
import Task from '../assets/task.png';

class Featureblock extends React.Component {
  render() {
    return(
      <Wrapper style={{textAlign: 'center'}}>
        <div>
          <h3 style={{ textDecoration: 'underline', background: 'inherit', paddingTop: "10px", paddingBottom: '20px'}}>Application Features</h3>
        </div>
        <Content>
          <Block>
            <BlockContent>
              <Title>
                <BlockHeader>Calendar</BlockHeader>
              </Title>
              <Image src={Calendar} alt="CALENDAR" />
              <Text>Search and subscribe to multiple organizations to see their events</Text>
              <Text>Export calendar as an .ics file</Text>
            </BlockContent>
          </Block>
          <Block>
            <BlockContent>
              <Title>
                <BlockHeader>Group Functionality</BlockHeader>
              </Title>
              <Image src={Group} alt="GROUP" />
              <div style={{display: 'flex'}}>
                <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <Text>Create and manage groups and edit the information of each group with ease</Text>
                  <Text>Join organizations already created</Text>
                </div>
              </div>
            </BlockContent>
          </Block>
          <Block>
            <BlockContent>
              <Title>
                <BlockHeader>Task Manager</BlockHeader>
              </Title>
              <Image src={Task} alt="TASK" />
              <Text>Create and assign tasks with priorities to those in your personalized groups</Text>
              <div style={{display: 'flex', justifyContent:'space-evenly'}}>
                <MiniButtons>Assign</MiniButtons>
                <MiniButtons>Create</MiniButtons>
              </div>
              {/* <Text>Sync tasks to your calendar as reminders</Text> */}
              </BlockContent>
          </Block>
        </Content>
      </Wrapper>
    );
  }
}

export default Featureblock;