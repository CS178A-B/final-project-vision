import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, Authentication } from './styled';
import { buttonColor } from '../Colors.js';
import authenticationButton from '../authentication-button';
import AuthNav from '../auth-nav';
// import Logo from '../assets/IMG_3631.svg';

class Navbar extends React.Component {
  render() {
    return(
      <Wrapper>
        <LogoContainer>
        LOGO GOES HERE with VISION
        {/* <Logo /> */}
        </LogoContainer>
        <ButtonContainer>
          <LeftGroup>
            <NavButton>About</NavButton>
            <NavButton>Features</NavButton>
            <NavButton>Contact</NavButton>
          </LeftGroup>

          <RightGroup>
            <AuthNav />
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;