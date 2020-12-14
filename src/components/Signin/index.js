import React from 'react';
import { Wrapper } from './styled';
import { fontColor } from '../Colors.js';

class Signin extends React.Component {
  render() {
    return (
      <Wrapper>
        <p>Sign in to *LOGO* VISION</p>
        <p>Log in to save your progress. We don't post anything anywhere.</p>
        <button style={{ color: fontColor.White }}>Google</button>
      </Wrapper>
    );
  }
}

export default Signin;