import styled from 'styled-components';
import { fontColor } from '../Colors';

export const Button = styled.button`
    color: ${props => props.fontColor || "blue"};
    background-Color: ${props => props.bgColor || "red" };
    border: 1px solid ${fontColor.Blue};
    font-size: 16px;
    min-height: 15px;
    min-width: 40px;
    padding: 20px;
    border-radius: 50px;
`;

// destructing --> exporting someting only using {}
// export const TopText = styled.h1`
//  font-size: 20px;
// `;

