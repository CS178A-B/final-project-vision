import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, Authentication, LogoImage } from './styled';
import { buttonColor } from '../Colors.js';
import Logo from '../assets/logo.png';

class Navbar extends React.Component {
  render() {
    const { togglePop } = this.props;
    return(
      <Wrapper>
        <LogoContainer>
          <LogoImage src={Logo} />
          <h2>VISION</h2>
        </LogoContainer>
        <ButtonContainer>
          <LeftGroup>
            <NavButton>About</NavButton>
            <NavButton>Features</NavButton>
            <NavButton>Contact Us</NavButton>
          </LeftGroup>

          <RightGroup>
            {/* <Authentication style={{ backgroundColor: buttonColor.Gray }}>Login</Authentication> */}
            <Authentication onClick={togglePop} style={{ backgroundColor: buttonColor.Green }} >Sign In</Authentication>
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;