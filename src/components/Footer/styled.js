import styled from 'styled-components';
import { bgColor, fontColor } from '../Colors.js';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 60px;
  padding: 100;
  background-color: ${bgColor.DarkBlue};
  color: ${fontColor.White};
`;

// TODO; stick to the bottom of the page
// border: 2px dotted black;