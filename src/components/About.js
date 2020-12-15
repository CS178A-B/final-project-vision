import React from 'react';
import Navbar from './Navbar';
import Aboutblock from './Aboutblock';
import Footer from './Footer';

class About extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        <Aboutblock />
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default About;