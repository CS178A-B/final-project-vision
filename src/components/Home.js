import React from 'react';
// import LargeButton from './LargeButton/index.js';
import Navbar from './Navbar';
import Homeblock from './Homeblock';
import Footer from './Footer';
import Signin from './Signin';

class Home extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        <Homeblock />
        <Footer />
        <Signin />
        {/* TODO: Footer */}
      </div>
    );
  }
}

export default Home;