import styled from 'styled-components';
import { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 550px;
  border: 2px dashed black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AboutP = styled.p`
  text-align: center;
`;

export const Float = keyframes`
  0%, 100% { top: 48%; left: 26% }
  50% { top: 52%; left: 29% }
`;

export const Cloud = styled.img`
  animation: ${Float} 19s linear infinite;
  position: absolute;
  // transform: scaleX(-1);
  left: 28%; 
  top: 50%;
  width: 45%;
  opacity: 0.95;
`;