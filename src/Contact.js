import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contactblock from './components/Contactblock';
// import Header from './components/Header';

class Contact extends React.Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Navbar />
        <Contactblock />
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Contact;