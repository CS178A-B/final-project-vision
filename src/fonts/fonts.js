import { createGlobalStyle } from 'styled-components';

// import BoldItalic from './Barlow-BoldItalic.ttf';
// import ExtraBold from './Barlow-ExtraBold.ttf';
// import ExtraBoldItalic from './Barlow-ExtraBoldItalic.ttf';
// import ExtraLight from './Barlow-ExtraLight.ttf';
// import ExtraLightItalic from './Barlow-ExtraLightItalic.ttf';
// import Italic from './Barlow-ExtraLightItalic.ttf';
// import Light from './Barlow-Light.ttf';
// import LightItalic from './Barlow-LightItalic.ttf';
// import Medium from './Barlow-Medium.ttf';
// import MediumItalic from './Barlow-MediumItalic.ttf';
// import Regular from './Barlow-Regular.ttf';
// import SemiBold from './Barlow-SemiBold.ttf';
// import SemiBoldItalic from './Barlow-SemiBoldItalic.ttf';
// import Thin from './Barlow-Thin.ttf';
// import ThinItalic from './Barlow-ThinItalic.ttf';
import DINAlternate from './DIN-Alternate-Bold.woff';

export default createGlobalStyle`
    @font-face {
        font-family: 'DIN Alternate';
        src: url(${DINAlternate}) format('woff');
        font-weight: bold;
        font-style: normal;
    }
`;