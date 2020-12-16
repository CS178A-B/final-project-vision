import React from 'react';
import LargeButton from '../LargeButton';
import { H1Line1, Headertext, LeftGroup, RightGroup, Windows, Wrapper } from './styled';
import { fontColor } from '../Colors.js';
import Logo from '../assets/homeimg.png';

class Homeblock extends React.Component {
  // test
  render() {
    return(
      <Wrapper>
        <LeftGroup>
          <Headertext>
            <h1>
            <H1Line1 color={fontColor.Red}>Schedule Events.<br/></H1Line1>
              <H1Line1 color={fontColor.Yellow}>Manage your groups.<br/></H1Line1>
              <H1Line1 color={fontColor.Green}>Assign tasks.</H1Line1>
           </h1>
          </Headertext>
          <div>
            <LargeButton
              text="TRY VISION FOR FREE"
              fontColor={fontColor.Blue}
              bgColor="white"
            // LargeButton end
            /> 
          </div>
        </LeftGroup>
        <RightGroup>
          <Windows src={Logo} />
        </RightGroup>
      </Wrapper>
    );
  }
}

export default Homeblock;