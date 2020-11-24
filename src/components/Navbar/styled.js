import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 40px;
  border: 2px solid black;
  display: flex;
  align-items: center;
`;

// h/w relative to parent container
export const LogoContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  border: 2px solid red;
  font-weight: bold;
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 4px solid yellow;
`;

/// authentication
export const RightGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: green;
`;

export const NavButton = styled.button`
  height: 20px;
  width: 80px;
  border: none;
`;

// login + signup
export const Authentication = styled.button`
  height: 20px;
  width: 80px;
  margin: 0;
  border: none;
  padding-right: 10px;
`;
