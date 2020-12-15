import React from 'react';
import Navbar from './Navbar';
import Homeblock from './Homeblock';
import Footer from './Footer';

class Home extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        <Homeblock />
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;