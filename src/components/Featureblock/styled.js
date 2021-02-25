import styled from 'styled-components';
import { bgColor, fontColor } from '../colors';

export const Wrapper = styled.div`
  // width: 100%;
  // height: 500px;
  // margin: auto;
  // padding: 0;
  // display: block;
  // flex-direction: column;
  // align-items: center;
  // color: ${fontColor.Blue};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const Block1 = styled.div`
  // background-color: red;
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  width: 250px;
`;

export const Block2 = styled.div`
  // background-color: yellow;
  background-color: ${bgColor.LightBlue};
  width: 500px;
  
`;

export const Block3 = styled.div`
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  width: 250px;
`;

export const BlockContent = styled.div`
  margin-top: 25px;

`;

export const Title = styled.div`
  // margin-top: 20px;
  // border: 2px solid black;
`;

export const MiniButtons = styled.h6`
  background-color: ${bgColor.Gray};
  opacity: 50%;
  padding: 10px;
  border-radius: 10px;
`;

export const ImageS = styled.img`
  width: 90%;
  margin-top: 5%;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

export const ImageL = styled.img`
  width: 85%;
  margin-top: 5%;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;