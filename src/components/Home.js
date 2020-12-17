import React from 'react';
import LargeButton from './LargeButton/index.js';
import Navbar from './Navbar';
import Homeblock from './Homeblock';
import Footer from './Footer';
import LoginButton from './login-button';
import AuthenticationButton from './authentication-button';
import AuthNav from './auth-nav.js';

class Home extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        <Homeblock />
        <Footer />
        <AuthenticationButton />

        TODO: Footer
      </div>
    );
  }
}

export default Home;