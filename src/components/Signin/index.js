import React from 'react';
import LargeButton from '../LargeButton';
import { BrandContainer, Smalltext, Wrapper } from './styled';
import { fontColor } from '../Colors.js';
import Logo from '../Logo';
import GoogleLogo from '../assets/googlelogo.png';
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

class Signin extends React.Component {
  render() {
    return (
      <Wrapper>
        <Smalltext style={{ paddingTop: '20px', marginBottom: '0'}} fontSize='16px'>Sign in to </Smalltext>
        <BrandContainer>
          {/* <img src={Logo} alt="Logo"/>  */}
          <Logo />
          <h1 style={{ backgroundColor: 'inherit', margin:'10px' }}>VISION</h1>
        </BrandContainer>
        <Smalltext style={{ paddingTop: '20px', paddingBottom: '20px' }}>Log in to access your account and save your progress. We don't post anything anywhere.</Smalltext>
        {/* <button style={{ backgroundColor: 'blue', color: fontColor.White }}>Google</button> */}
        <BrandContainer>
        <Logo img={ GoogleLogo } height='40px' width='40px'/>
        <LargeButton
              text="Google"
              fontColor={fontColor.White}
              bgColor="blue"
              padding='10px'
              borderRadius= "5px"
            // LargeButton end
          />
        </BrandContainer>
      </Wrapper>
    );
  }
}

export default Signin;