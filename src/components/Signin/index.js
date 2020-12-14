import React from 'react';
import LargeButton from '../LargeButton';
import { Smalltext, Wrapper } from './styled';
import { fontColor } from '../Colors.js';

class Signin extends React.Component {
  render() {
    return (
      <Wrapper>
        <Smalltext style={{ paddingTop: '20px' }}>Sign in to </Smalltext>
        <h3 style={{ backgroundColor: 'inherit' }}>*LOGO* VISION</h3>
        <Smalltext style={{ paddingBottom: '20px' }}>Log in to access your account and save your progress. We don't post anything anywhere.</Smalltext>
        {/* <button style={{ backgroundColor: 'blue', color: fontColor.White }}>Google</button> */}
        <LargeButton
              text="Google"
              fontColor={fontColor.White}
              bgColor="blue"
              padding='10px'
              borderRadius= "5px"
            // LargeButton end
            /> 

      </Wrapper>
    );
  }
}

export default Signin;