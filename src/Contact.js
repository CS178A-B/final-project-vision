import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class Contact extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        {/* TODO: Contact Block */}
        <h1> C O N T A C T </h1>
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Contact;