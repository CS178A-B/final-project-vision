import styled from 'styled-components';
import { bgColor, fontColor } from '../colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  margin: auto;
  padding: 0;
  display: block;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${fontColor.Blue};
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items:center;
  width: 80vw;
  margin: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
    width: 70%;
  }
`;

export const Block = styled.div`
  width: 30%;
  height: 65vh;
  // background-color: red;
  background-color: ${bgColor.LightBlue};
  border-radius: 25px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// export const Block1 = styled.div`
//   width: 25%;
//   height: 475px;
//   // background-color: red;
//   background-color: ${bgColor.LightBlue};
//   border-radius: 25px;
  
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// export const Block2 = styled.div`
//   width: 50%;
//   height: 475px;
//   // background-color: yellow;
//   background-color: ${bgColor.LightBlue};
//   border-radius: 25px;
//   margin-left: 20px;
//   margin-right: 20px;
  
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// export const Block3 = styled.div`
//   width: 25%;
//   height: 475px;
//   // background-color: green;
//   background-color: ${bgColor.LightBlue};
//   border-radius: 25px;
//   // display: flex;
//   // flex-direction: column;
//   // justify-content: center;
//   // align-items: center;
  
//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

export const BlockHeader = styled.h6`
  font-size: 1em;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }

  @media (min-width: 1024px) {
    font-size: 1.3em;
  }
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

export const Image = styled.img`
  width: 70%;
  margin-top: 20px;
  margin-bottom: 5%;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

// export const ImageL = styled.img`
//   width: 85%;
//   margin-top: 5%;
//   margin-bottom: 5%;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

export const Text = styled.p`
  font-size: 0.9em;
  margin: 30px;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (min-width: 800px) {
    font-size: 1.2em;
  }
`;