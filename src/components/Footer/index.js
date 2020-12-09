import React from 'react';
import { Wrapper } from './styled';

class Footer extends React.Component {
  render() {
    return(
      <Wrapper>
        {/* Concern: combine or style */}
        <h3 style={{ margin: '10px', textAlign: 'center', backgroundColor: 'inherit' }}>The flexible scheduler personalized for you.</h3>
        <h4 style={{  textAlign: 'center', marginTop: '0', marginBottom: '10px', backgroundColor: 'inherit' }}>Made for everybody.</h4>
      </Wrapper>
    );
  }
}

export default Footer;