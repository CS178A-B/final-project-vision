import styled from 'styled-components';
import { bgColor } from '../colors';
import { device } from '../device';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* height: 500px; // make height a percentage  -- check out "vh" css */
  margin: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow: scroll;

  // @media (max-width: 480px) {
  //   .col {  margin: 1% 0 1% 0%; }
  //   .span_1_of_4, .span_2_of_4, .span_3_of_4, .span_4_of_4 { width: 100%; }
  // }

  @media ${device.mobileM} {
    flex-direction: column;
    align-items: center;
    overflow: scroll;
  }
`;
// border: 2px dashed black;
// display: grid;
// grid-template-columns: 18% 18% 18% 18%;

export const ContactSection = styled.div`
  text-align: center;
  min-height: 60vh;
  // height: 370px;
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  margin: 1% 1% 1% 1%;
  padding: 20px 4px 20px 4px;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media ${device.mobileM} {
    margin: 20px;
    width: 70%;
  }
`;
// margin-block-start: 3em;
// margin-block-end: 2em;
// margin-inline-start: 10px;
// margin-inline-end: 10px;

export const AboutSection = styled.div`
  background-color: inherit;
  display: block;
  height: 80%;
  border: 2px dashed green;
`;
// border-radius: 5px;
// margin-inline-start: 20px;
// margin-inline-end: 20px;

export const AboutText = styled.h4`
  margin: 6px 0px 0px 0px;
  padding: 0px;
  font-size: 1em;
  background-color: inherit;
`;

export const ContactPhoto = styled.img`
  width:80%;
  background-color: inherit;

  @media (max-width: 768px) {
    width: 40%;
  }
`;

export const Link = styled.a`
  background: ${bgColor.Violet};
  padding: 5%;
  color: ${bgColor.White};
  border-radius: 10px;
  
  .changeColor:hover & {
    color: ${bgColor.LightBlue};
  }

  @media ${device.mobileM}) {
    // padding: 2%;
    color: red;
  }
`;