import React from 'react';
import CircularButton from './CircularButton';
import LargeButton from './LargeButton/index.js';
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
        <Footer />
        {/* TODO: Footer */}
      </div>
    );
  }
}

export default Home;