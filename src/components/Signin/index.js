import React from 'react';
import { BrandContainer, Smalltext, Wrapper } from './styled';
import Logo from '../Logo';
import GoogleLogo from '../assets/googlelogo.png';
import { withAuth0 } from "@auth0/auth0-react";
import AuthNav from '../auth-nav';
// import Logo from '../assets/logo.png';

// document.addEventListener("DOMContentLoaded",() => {
//   const the_button = document.querySelector(".js-btn")
//   the_button.addEventListener("click", handleClick)
// })

// function handleClick(event) {
//   const modal = document.querySelector(".modal")
//   const closeBtn = document.querySelector(".close")
//   modal.style.display = "block";
//   closeBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//   })
// }

const Signin = props =>  {
    return (
      <Wrapper>
        {/* <Smalltext style={{ paddingTop: '20px', marginBottom: '0'}} fontSize='16px'>Sign in to </Smalltext> */}
        <BrandContainer>
          {/* <img src={Logo} alt="Logo"/>  */}
          <Logo />
          <h1 style={{ backgroundColor: 'inherit', margin:'10px' }}>VISION</h1>
        </BrandContainer>
        <Smalltext style={{ paddingTop: '20px', paddingBottom: '20px' }}>Allow access to your account and save your progress. We don't post anything anywhere.</Smalltext>
        {/* <button style={{ backgroundColor: 'blue', color: fontColor.White }}>Google</button> */}
        <BrandContainer>
        <Logo img={ GoogleLogo } height='40px' width='40px'/>
        <AuthNav />
        </BrandContainer>
      </Wrapper>
    );
}

export default withAuth0(Signin);