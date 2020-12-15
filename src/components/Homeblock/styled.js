import styled from 'styled-components';
import { keyframes } from 'styled-components';
// import { fontColor } from '../Colors.js';

// module.exports = fontColor;

// parent homeblock wrapper
export const Wrapper = styled.div`
  width: 100%;
  height: 550px;
  border: 2px dashed black;
  display: flex;
  align-items: center;
`;

export const LeftGroup = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 50px;
  border: 2px dashed red;
`;

export const RightGroup = styled.div`
  width: 50%;
  height: 80%;
  border: 2px dashed blue;
  text-align: center;
`;

// Text-align (L/R) margin (T/B)
export const Headertext = styled.div`
  width: 80%;
  height: 50%;
  border: 2px solid yellow;
`;

/* 
  Q/Concerns: 
    - styled components per line vs functional component to change text color --> more complex in styling other parts?
    - global constant for colors
    - a whole component for a certain header text --> stack them instead of bunching in one h1 tag and separating styling
*/
export const H1Line1 = styled.span`
  color: ${props => props.color};
`;

// side img
export const Float = keyframes`
  0%, 100% { top: 40%; left: 50% }
  50% { top: 38%; left: 52% }
`;

export const Windows = styled.img`
  animation: ${Float} 19s linear infinite;
  position: absolute;
  left: 50%;
  top: 35%;
  width: 50%;
`;