import styled from 'styled-components';
import { bgColor, fontColor } from '../colors.js';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${bgColor.Gray};
  color: ${fontColor.White};
  position: sticky;
  top: 0;
  z-index: 3;
`;

// TODO; stick to the bottom of the page
// border: 2px dotted black;