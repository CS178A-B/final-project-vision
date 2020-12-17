  
import styled from 'styled-components';
import { bgColor, fontColor } from '../Colors.js';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  background-color: ${bgColor.DarkBlue};
  color: ${fontColor.White};
  position: fixed;
  bottom: 0;
`;

// TODO; stick to the bottom of the page
// border: 2px dotted black;