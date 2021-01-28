import styled from 'styled-components';
import { fontColor } from '../colors';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  color: ${fontColor.Blue};
`;
// border: 2px solid black;

// h/w relative to parent container
export const LogoContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0px 50px 0px 50px;
`;
// border: 2px solid red;

// logo
// export const LogoImage = styled.img`
//   width: 55px;
//   height: 50px;
//   padding-right: 10px;
// `;

export const ButtonContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
// border: 2px solid blue;

// buttons
// align items vertically
// justify content -- along axis
export const LeftGroup = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
// border: 4px solid yellow;

// login
export const RightGroup = styled.div`
  width: 20%;
`;
// border: 1px solid;

// menu
export const NavButton = styled.button`
  height: 40px;
  width: 100px;
  border: none;
  padding: 0;
  color: ${fontColor.Blue};
`;

// login + signup
export const SigninButton = styled.button`
  height: 40px;
  width: 100px;
  border: none;
  color: ${fontColor.Blue};
  border-radius: 3px;
  float: right;
`;
// background-color: green;  
  