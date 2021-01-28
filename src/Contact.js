import React from 'react';
import Footer from './components/Footer';
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
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Contact;