import React from 'react';
import Aboutblock from './components/Aboutblock';
import Footer from './components/Footer';
import NavbarHome from './components/NavbarHome';

class About extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <NavbarHome />
        <Aboutblock />
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default About;