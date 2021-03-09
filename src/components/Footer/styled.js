import styled from 'styled-components';
import { bgColor, fontColor } from '../colors.js';

export const Wrapper = styled.div`
  background-color: ${bgColor.DarkBlue};
  color: ${fontColor.White};
  flex-shrink: 0;
`;

// TODO; stick to the bottom of the page
// border: 2px dotted black;