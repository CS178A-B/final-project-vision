import React, { useState } from 'react';
import { Wrapper, LogoContainer, ButtonContainer, NavButton, LeftGroup, RightGroup, SigninButton } from './styled';
import { buttonColor } from '../Colors.js';
import authenticationButton from '../authentication-button';
import AuthNav from '../auth-nav';
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
    console.log("in authLinks")
    if(isAuthenticated) {
      console.log("logged in")
    }
    return !isAuthenticated ? <></> : <>
            <Link to="/calendar">
              <NavButton>Calendar</NavButton>
            </Link>
            <Link to="/clubs">
              <NavButton>Clubs</NavButton>
            </Link>   
          </>
  }
  const togglePop = () => {
    togglePopup(!showPopup)
  };

  
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
            {authLinks()}  
          </LeftGroup>

          <RightGroup>
            {/* <AuthNav /> */}
            <SigninButton onClick={togglePop} style={{ backgroundColor: buttonColor.Green }} >Account</SigninButton>
            {showPopup ? <Signin toggle={togglePop} /> : null}
          </RightGroup>
        </ButtonContainer>
      </Wrapper>

    );
}

export default withAuth0(Navbar);