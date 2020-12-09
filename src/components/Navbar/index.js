import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, Authentication } from './styled';
import { buttonColor } from '../Colors.js';
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
            <Authentication style={{ backgroundColor: buttonColor.Gray }}>Login</Authentication>
            <Authentication style={{ backgroundColor: buttonColor.Green }}>Sign Up</Authentication>
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;