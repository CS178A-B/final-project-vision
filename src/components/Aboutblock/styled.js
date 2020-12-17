import styled from 'styled-components';
import { keyframes } from 'styled-components';
import '../../index.css';

export const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow-x: hidden;
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
  top: 50%;
  padding-top: -250px;
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
  background: inherit;
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