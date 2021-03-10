import React from 'react';
import { Wrapper } from './styled';

class Footer extends React.Component {
  render() {
    return(
      <Wrapper>
        {/* Concern: combine or style */}
        <div style={{ margin: '10px', textAlign: 'center', backgroundColor: 'inherit' }}>The flexible scheduler personalized for you.</div>
        <div style={{  textAlign: 'center', marginTop: '0', marginBottom: '10px', backgroundColor: 'inherit' }}>Made for everybody. ❤</div>
      </Wrapper>
    );
  }
}

export default Footer;