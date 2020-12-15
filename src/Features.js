import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class Features extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        {/* TODO: Features block */}
        <h1> F E A T U R E S</h1>
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Features;