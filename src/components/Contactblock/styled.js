import styled from 'styled-components';
import { bgColor } from '../Colors';

export const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  border: 2px dashed black;
  display: grid;
  grid-template-columns: 18% 18% 18% 18%;
  margin: auto;
  justify-content: center;
`;

export const ContactSection = styled.div`
  text-align: center;
  margin-block-start: 3em;
  margin-block-end: 2em;
  margin-inline-start: 10px;
  margin-inline-end: 10px;
  background-color: ${bgColor.White};
  border-radius: 3px;
`;

export const AboutSection = styled.div`
  background-color: inherit;
  border-radius: 5px;
  margin-inline-start: 20px;
  margin-inline-end: 20px;
`;

export const AboutText = styled.h4`
  margin: 10px;
  font-size: 1em;
  background-color: inherit;
`;

export const ContactPhoto = styled.img`
  width: 100%;
  background-color: inherit;
`;
