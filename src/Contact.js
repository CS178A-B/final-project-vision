import React from 'react';
import Contactblock from './components/Contactblock';
import NavbarHome from './components/NavbarHome';
import Header from './components/Header';
// import Header from './components/Header';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NavbarHome />
        <Contactblock />
      </div>
    );
  }
}

export default Contact;