import React, { useState } from 'react';
//import LargeButton from './LargeButton/index.js';
import Navbar from './Navbar';
import Homeblock from './Homeblock';
import Footer from './Footer';
// import LoginButton from './login-button';
// import AuthenticationButton from './authentication-button';
// import AuthNav from './auth-nav.js';
import Signin from './Signin';
import Header from './Header';
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
        <Navbar />
        <Homeblock togglePop={handleToggle} />
        {showPopup ? <Signin toggle={togglePopup} /> : null}
        <Footer />
      </div>
    );
}

export default Home;