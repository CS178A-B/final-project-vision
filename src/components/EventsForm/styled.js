import styled from 'styled-components';
import { bgColor, fontColor } from '../colors';

export const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  // background-color: white;
  background: ${bgColor.BlueGray};
  border-radius: 10px;
  color: ${fontColor.Blue};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -400px;
  z-index: 2;

  @media (max-width: 500px) {
    width: 50%;
    position: absolute;
    left: 50%;
    margin-left: -200px;
  }

  @media (max-width: 925px) {
    width: 70%;
    position: absolute;
    left: 50%;
    margin-left: -280px;
  }
`;

export const HeadingText = styled.h5`
  font-size: 1.2em;
  color: gray;
`;

export const NameInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  height: 80px;
  border: none;
  border-radius: 10px;
  resize: none;
`;

export const StartInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
`;

export const EndInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
`;

export const Section = styled.div`
  padding-top: 10px;
  width: 90%;
  margin: auto;
`;

export const FormTitle = styled.h2`
  padding-top: 20px;
`;
