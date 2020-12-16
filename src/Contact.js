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
        <h1 style = {Styles.container}> C O N T A C T </h1>
        <div style={{ width: '100%', position: 'fixed', bottom: '0' }}>
          <Footer />
        </div>
      </div>
    );
  }
}

const Styles = {
    container: {
        backgroundColor: '#8ecae6',
        height: '50px'
    },

    title: {
        fontSize: '12px'
    }
};

export default Contact;