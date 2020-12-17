import React from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, SigninButton } from './styled';
import { buttonColor } from '../Colors.js';
import Logo from '../Logo';
import Signin from '../Signin';
// import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

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
          {/* <LogoImage src={Logo} /> */}
          <Logo />
          <h2 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 'bold', letterSpacing: '0.1em' }}>VISION</h2> 
        </LogoContainer>
        <ButtonContainer>
          <LeftGroup>
            <Link to="/about">
              <NavButton>About</NavButton>
            </Link>
            <Link to="/features">
              <NavButton>Features</NavButton>
            </Link>
            <Link to="/contact">
              <NavButton>Contact Us</NavButton>
            </Link>  
          </LeftGroup>

          <RightGroup>
            <SigninButton onClick={this.togglePop} style={{ backgroundColor: buttonColor.Green }} >Sign In</SigninButton>
            {showPopup ? <Signin toggle={this.togglePop} /> : null}
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
  }
}

export default Navbar;