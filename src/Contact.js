import React from 'react';
import Contactblock from './components/Contactblock';
import NavBar from './components/NavBar';
// import Header from './components/Header';

class Contact extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Contactblock />
      </div>
    );
  }
}

export default Contact;