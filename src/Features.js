import React from 'react';
import NavbarHome from './components/NavbarHome';
import Featureblock from './components/Featureblock';
import Header from './components/Header';

class Features extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavbarHome />
        <Featureblock  />
      </div>
    );
  }
}

export default Features;