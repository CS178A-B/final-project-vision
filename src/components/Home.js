import React from 'react';
import Navbar from './Navbar';
import Homeblock from './Homeblock';
import Footer from './Footer';
import Signin from './Signin';
import Header from './Header';

class Home extends React.Component {
  // set up state here
  state = {
    showPopup: false
  };

  togglePop = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  // write your updateState wrapper function
  render() {
    const { showPopup } = this.state;
    return (
      <div>
        <Header />
        <Navbar togglePop={this.togglePop} />
        <Homeblock togglePop={this.togglePop} />
        {showPopup ? <Signin toggle={this.togglePop} /> : null}
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;