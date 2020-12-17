import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, Authentication, LogoImage } from './styled';
import { buttonColor } from '../Colors.js';
import Signin from '../Signin';
import Logo from '../assets/logo.png';

class Navbar extends React.Component {
  state = {
    seen: false
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };
  
  render() {
    return(
      <Wrapper>
        <LogoContainer>
        <LogoImage src={Logo} />
        <h2>VISION</h2>
        {/* <Logo /> */}
        </LogoContainer>
        <ButtonContainer>
          <LeftGroup>
            <NavButton>About</NavButton>
            <NavButton>Features</NavButton>
            <NavButton>Contact Us</NavButton>
            <NavButton>Calendar</NavButton>
            <NavButton>Organizations</NavButton>

          </LeftGroup>

          <RightGroup>
            {/* <Authentication style={{ backgroundColor: buttonColor.Gray }}>Login</Authentication> */}
            <div onClick={this.togglePop}><Authentication style={{ backgroundColor: buttonColor.Green }} >Sign In</Authentication>
            </div>
            {this.state.seen ? <Signin toggle={this.togglePop} /> : null}
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;