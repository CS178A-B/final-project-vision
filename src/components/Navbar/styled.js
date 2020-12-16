import styled from 'styled-components';
import { fontColor } from '../Colors';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 40px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  color: ${fontColor.Blue};
`;

// h/w relative to parent container
export const LogoContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 2px solid red;
  font-weight: bold;
  margin: 0px 50px 0px 50px;
`;

// logo
export const LogoImage = styled.img`
  width: 55px;
  height: 50px;
  padding-right: 10px;
`;

export const ButtonContainer = styled.div`
  width: 40%;
  height: 100%;
  border: 2px solid blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// buttons
// align items vertically
// justify content -- along axis
export const LeftGroup = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 4px solid yellow;
`;

// authentication
export const RightGroup = styled.div`
  width: 35%;
  border: 1px solid;
`;

// menu
export const NavButton = styled.button`
  height: 20px;
  width: 80px;
  border: none;
  color: ${fontColor.Blue};
`;

// login + signup
export const Authentication = styled.button`
  height: 20px;
  width: 80px;
  border: none;
  color: ${fontColor.Blue};
  background-color: green;  
  border-radius: 3px;
  float: right;
`;