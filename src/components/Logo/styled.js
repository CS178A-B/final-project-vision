import styled from 'styled-components';

export const LogoImage = styled.img`
    background-Color: ${props => props.bgColor || 'inherit' };
    width: ${props => props.width || '55px' };
    height: ${props => props.height || '50px' };
    padding: 0 ${props => props.paddingRight || '10px'} 0 0;
`;

// destructing --> exporting someting only using {}
// export const TopText = styled.h1`
//  font-size: 20px;
// `;

