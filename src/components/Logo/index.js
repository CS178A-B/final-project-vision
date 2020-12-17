import React from 'react';
import { LogoImage } from './styled';
import Image from '../assets/logo.png';

const Logo = ({ bgColor, width, height, paddingRight, img }) => {
  return (
    <>
    <LogoImage src={ img || Image} bgColor={bgColor} width={width} height={height} paddingRight={paddingRight}/>
    </>
  );
};

export default Logo;