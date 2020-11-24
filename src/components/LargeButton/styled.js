import styled from 'styled-components';

export const Button = styled.button`
    color: ${props => props.fontColor || "white"};
    background-Color: ${props => props.bgColor || "red" };
    border: 2px black;
    font-size: 16px;
    min-height: 15px;
    min-width: 40px;
`;

// destructing --> exporting someting only using {}
// export const TopText = styled.h1`
//  font-size: 20px;
// `;

