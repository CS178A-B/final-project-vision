import React from 'react';
import { Button, TopText } from './styled';

/*
Functional Componet
- no explicit state
- no render function, just the return()
- uses hooks to manage state (setState)/ lifecycle methods (useEffect)
*/

// yarn add styled-components
const LargeButton = ({ text, fontColor, bgColor, padding, borderRadius }) => {
  return (
    <>
    {/* <TopText>HELLO</TopText> */}
    <Button fontColor={fontColor} bgColor={bgColor} padding={padding} borderRadius={borderRadius}>
      {text}
    </Button>
    {/* <button style={{ color: "blue", height: "200px", width: "500px" }}></button> */}
    </>
  );
};

export default LargeButton;