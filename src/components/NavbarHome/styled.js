import styled from 'styled-components';
import { fontColor } from '../colors';

export const Wrapper = styled.div`
  line-height: 75px;
  display: flex;
  justify-content: space-between;
  color: ${fontColor.Blue};
`;
// border: 2px solid black;

// h/w relative to parent container
export const LogoContainer = styled.div`

  display: flex;
  align-items: center;
`;
// border: 2px solid red;

// logo
// export const LogoImage = styled.img`
//   width: 55px;
//   height: 50px;
//   padding-right: 10px;
// `;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
// border: 2px solid blue;

// buttons
// align items vertically
// justify content -- along axis
export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
// border: 4px solid yellow;

// login
export const RightGroup = styled.div`
  margin-right: auto;
`;
// border: 1px solid;

// menu
export const NavButton = styled.button`
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
  