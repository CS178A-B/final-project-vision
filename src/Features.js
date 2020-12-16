import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class Features extends React.Component {
  render() {
    return (
      <div>
        {/* TODO: Announcements bar */}
        <Navbar />
        {/* TODO: Features block */}
        <h1 style = {Styles.container}> F E A T U R E S</h1>
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

export default Features;