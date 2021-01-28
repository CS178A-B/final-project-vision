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
            <Link to="/organizations">
              <NavButton>Organizations</NavButton>
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
              <NavButton>Calendar</NavButton>
            </Link>
            <Link to="/features">
              <NavButton>Organizations</NavButton>
            </Link>
            <Link to="/contact">
              <NavButton>Task Manager</NavButton>
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