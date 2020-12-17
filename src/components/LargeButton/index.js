import React from 'react';
import { Button } from './styled';

/*
Functional Componet
- no explicit state
- no render function, just the return()
- uses hooks to manage state (setState)/ lifecycle methods (useEffect)
*/

// yarn add styled-components
const LargeButton = ({ text, fontColor, bgColor, padding, borderRadius, onClick }) => {
  return (
    <>
    {/* <TopText>HELLO</TopText> */}
    <Button onClick={onClick} fontColor={fontColor} bgColor={bgColor} padding={padding} borderRadius={borderRadius}>
      {text}
    </Button>
    {/* <button style={{ color: "blue", height: "200px", width: "500px" }}></button> */}
    </>
  );
};

export default LargeButton;