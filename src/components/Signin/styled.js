import styled from 'styled-components';
import { fontColor } from '../Colors.js'; 

export const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: white; 
  color: ${fontColor.Blue};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Smalltext = styled.p`
  // padding-top: 30px;
  background-color: inherit;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
`;