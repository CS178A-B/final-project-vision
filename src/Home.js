import React, { useState } from 'react';
//import LargeButton from './LargeButton/index.js';
import NavbarHome from './components/NavbarHome';
import Homeblock from './components/Homeblock';
import Footer from './components/Footer';
// import LoginButton from './login-button';
// import AuthenticationButton from './authentication-button';
// import AuthNav from './auth-nav.js';
import Signin from './components/Signin';
import Header from './components/Header';
// import GlobalFonts from '../fonts/fonts.js';

const Home = props => {
   // set up state here
   const [showPopup, togglePopup] = useState(false);

   const handleToggle = () => {
     togglePopup(!showPopup)
   } 


    return (
      <div>
        {/* <GlobalFonts /> */}
        <Header />
        <NavbarHome />
        <Homeblock togglePop={handleToggle} />
        {showPopup ? <Signin toggle={togglePopup} /> : null}
      </div>
    );
}

export default Home;