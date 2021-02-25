import React from 'react';
import Aboutblock from './components/Aboutblock';
import Footer from './components/Footer';
import NavbarHome from './components/NavbarHome';
import Header from './components/Header';

class About extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavbarHome />
        <Aboutblock />
      </div>
    );
  }
}

export default About;