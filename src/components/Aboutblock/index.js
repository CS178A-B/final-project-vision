import React from 'react';
import { AboutContainer, AboutP, Cloud, Wrapper } from './styled';
import Logo from '../assets/cloud.png';

class Aboutblock extends React.Component {
  render() {
    return(
      <Wrapper>
        <AboutContainer>
          <h2 style={{ textDecoration: 'underline', background: 'inherit', paddingBottom: '20px' }}>What are we about?</h2>
          <AboutP>With Vision, we aim to give ease to people by providing a platform to combine multiple organization events with easy scheduling. Additionally, a task manager is included with a red-yellow-green stoplight coloring system for priority and group functions with a flexible experience.</AboutP>
        </AboutContainer>
        <span><Cloud src={ Logo }/></span>
      </Wrapper>
    );
  }
}

export default Aboutblock;