import React from 'react';
import LargeButton from '../LargeButton';
import { Smalltext, Wrapper } from './styled';
import { fontColor } from '../Colors.js';

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
  // handleClick = () => {
  //   this.props.toggle();
  // };

  render() {
    return (
      <Wrapper>
        <Smalltext style={{ paddingTop: '20px' }}>Sign in to </Smalltext>
        <h3 style={{ backgroundColor: 'inherit' }}>*LOGO* VISION</h3>
        <Smalltext style={{ paddingBottom: '20px' }}>Log in to access your account and save your progress. We don't post anything anywhere.</Smalltext>
        {/* <button style={{ backgroundColor: 'blue', color: fontColor.White }}>Google</button> */}
        <LargeButton
              text="Google"
              fontColor={fontColor.White}
              bgColor="blue"
              padding='10px'
              borderRadius= "5px"
            // LargeButton end
            />

      </Wrapper>
    );
  }
}

export default Signin;