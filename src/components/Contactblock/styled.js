import styled from 'styled-components';
import { bgColor } from '../colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 500px;
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

  @media (max-width: 768px) {
    flex-direction: column;
    // width: 80%;
  }
`;
// border: 2px dashed black;
// display: grid;
// grid-template-columns: 18% 18% 18% 18%;

export const ContactSection = styled.div`
  text-align: center;
  height: 370px;
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  margin: 1% 0 1% 1.6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    // margin: 1% 0 1% 0%;
    margin: 30px;
    width: 80%;
  }
`;
// margin-block-start: 3em;
// margin-block-end: 2em;
// margin-inline-start: 10px;
// margin-inline-end: 10px;

export const AboutSection = styled.div`
  background-color: inherit;
  display: block;
  height: 70%;
`;
// border-radius: 5px;
// margin-inline-start: 20px;
// margin-inline-end: 20px;

export const AboutText = styled.h4`
  margin: 10px;
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

  @media (max-width: 768px) {
    padding: 2%;
  }
`;