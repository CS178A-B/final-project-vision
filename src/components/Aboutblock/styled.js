import styled from 'styled-components';
import { keyframes } from 'styled-components';
import '../../index.css';
import { bgColor } from '../colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow-x: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -50%;
`;
// border: 2px dashed black;


export const AboutContainer = styled.div`
  padding-left: 15%;
  padding-right: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 25%;
  // padding-top: -250px;
  z-index: 1;
  background: rgba(204, 204, 204, 0);
`;
// border: 2px solid pink;

export const AboutP = styled.p`
  display: block;
  text-align: center;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  background: ${bgColor.LightBlue};
  padding: 20px;
  border-radius: 30px;
`;

// width: 500px;
// position: fixed;
// top: 50%;
// left: 50%;
// margin-top: -275px;
// margin-left: -200px;

export const Float = keyframes`
  0%, 100% { top: 29%; left: 10% }
  50% { top: 31%; left: 12% }
`;

export const Cloud = styled.img`
  animation: ${Float} 7s linear infinite;
  position: absolute;
  z-index: 0;
  width: 75%;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  background: rgba(204, 204, 204, 0);
`;