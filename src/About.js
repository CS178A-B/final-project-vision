import React from 'react';
import Aboutblock from './components/Aboutblock';
import Header from './components/Header';
import NavBar from './components/NavBar';

class About extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Aboutblock />
      </div>
    );
  }
}

export default About;