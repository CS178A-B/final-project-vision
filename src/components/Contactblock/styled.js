import styled from 'styled-components';
import { bgColor } from '../colors';

export const Wrapper = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
`;
// border: 2px dashed black;
// display: grid;
// grid-template-columns: 18% 18% 18% 18%;

export const ContactSection = styled.div`
  text-align: center;
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;

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
  display: flex;
  flex-direction: column;
  height: 70%;
`;
// border-radius: 5px;
// margin-inline-start: 20px;
// margin-inline-end: 20px;

export const AboutText = styled.div`
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
  margin: 10px;
  
  .changeColor:hover & {
    color: ${bgColor.LightBlue};
  }

  @media (max-width: 768px) {
    padding: 2%;
  }
`;