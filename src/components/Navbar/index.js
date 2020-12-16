import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, Authentication, LogoImage } from './styled';
import { buttonColor } from '../Colors.js';
import Signin from '../Signin';
import Logo from '../assets/logo.png';

class Navbar extends React.Component {
  state = {
    showPopup: false
  };

  togglePop = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render() {
    const { showPopup } = this.state;
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
            <div onClick={this.togglePop}><Authentication style={{ backgroundColor: buttonColor.Green }} >Sign In</Authentication>
            </div>
            {showPopup ? <Signin toggle={this.togglePop} /> : null}
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;