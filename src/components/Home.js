import React from 'react';
import CircularButton from './CircularButton';
import LargeButton from './LargeButton/index.js';

class Home extends React.Component { 
  render() {
    return (
      <div>
        LANDING PAGE
        <div>
          <LargeButton
              text="TRY VISION FOR FREE"
              fontColor="white"
              bgColor="yellow"
          />
        </div>
      </div>
    );
  }
}


// example

export default Home;