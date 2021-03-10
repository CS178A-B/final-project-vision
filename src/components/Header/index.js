import React from 'react';
import { Wrapper } from './styled';

class Header extends React.Component {
  render() {
    return(
      <Wrapper>
        <div style={{ textAlign: 'center', backgroundColor: 'inherit' }}>Important announcements and product updates here.</div>
      </Wrapper>
    );
  }
}

export default Header;