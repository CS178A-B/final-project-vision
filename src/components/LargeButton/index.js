import React from 'react';
import { Button, TopText } from './styled';
import { fontColor } from '../Colors.js';

/*
Functional Componet
- no explicit state
- no render function, just the return()
- uses hooks to manage state (setState)/ lifecycle methods (useEffect)
*/

// yarn add styled-components
const LargeButton = ({ text, fontColor, bgColor }) => {
  return (
    <>
    {/* <TopText>HELLO</TopText> */}
    <Button fontColor={fontColor} bgColor={bgColor}>
      {text}
    </Button>
    {/* <button style={{ color: "blue", height: "200px", width: "500px" }}></button> */}
    </>
  );
};

export default LargeButton;