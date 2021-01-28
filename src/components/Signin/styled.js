import styled from 'styled-components';
import { fontColor } from '../colors.js'; 

export const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  color: ${fontColor.Blue};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: -150px;
  margin-left: -150px;
  z-index: 2;
`;

export const BrandContainer = styled.div`
  background-color: inherit;
  display: flex;
  align-items: center; 
  padding: 0;
  margin: 0; 
`;

export const LogoImage = styled.img`
  background-color: inherit;
  width: '55px', height: '50px', paddingRight: '10px' }

`;

export const Smalltext = styled.p`
  // padding-top: 30px;
  font-size: ${props => props.fontSize || '14px'};
  background-color: inherit;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
`;