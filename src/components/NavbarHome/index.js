import React, { useState } from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, SigninButton } from './styled';
import { buttonColor } from '../colors.js';
import { withAuth0, useAuth0 } from "@auth0/auth0-react";
// import Logo from '../assets/IMG_3631.svg';
import Logo from '../Logo';
import Signin from '../Signin';
// import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = props => {
  const [showPopup,togglePopup] = useState(false)
  const { isAuthenticated } = useAuth0();

  const authLinks = () => {
    return !isAuthenticated ? <></> : <>
            <Link to="/calendar">
              <NavButton>Calendar</NavButton>
            </Link>
          </>
  }
  const togglePop = () => {
    togglePopup(!showPopup)
  };

  
    return(
      <Wrapper>
        <Link style={{textDecoration : "none", color: "currentcolor"}} to="/">
        <LogoContainer>
          {/* <LogoImage src={Logo} /> */}
          <Logo />
          <div style={{ textDecoration: 'none', fontSize: '70px',fontFamily: 'Barlow, sans-serif', fontWeight: 'bold', letterSpacing: '0.1em' }}>VISION</div> 
        </LogoContainer>
        </Link>
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
            {authLinks()}  
          </LeftGroup>

          <RightGroup>
            <SigninButton onClick={togglePop} style={{ height: "100%",backgroundColor: buttonColor.Green }} >Account</SigninButton>
            {showPopup ? <Signin toggle={togglePop} /> : null}
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
}

export default withAuth0(Navbar);