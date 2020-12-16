import React from 'react';
import { Wrapper } from './styled';

class Header extends React.Component {
  render() {
    return(
      <Wrapper>
        <h4 style={{  margin: '10px', textAlign: 'center', backgroundColor: 'inherit' }}>Important announcements and product updates here.</h4>
      </Wrapper>
    );
  }
}

export default Header;