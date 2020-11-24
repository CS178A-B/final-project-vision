import React from 'react';
import LargeButton from '../LargeButton';
import { H1Line1, H1Line2, H1Line3, Headertext, LeftGroup, RightGroup, Wrapper } from './styled';

class Homeblock extends React.Component {
  render() {
    return(
      <Wrapper>
        <LeftGroup>
          <Headertext>
            <h1>
              <H1Line1>Schedule events.<br/></H1Line1>
              <H1Line2>Manage your groups.<br/></H1Line2>
              <H1Line3>Assign tasks.</H1Line3>
            </h1>
          </Headertext>
          <div>
            <LargeButton
              text="TRY VISION FOR FREE"
              fontColor="blue"
              bgColor="white"
            // LargeButton end
            /> 
          </div>
        </LeftGroup>
        <RightGroup>
          IMAGE GOES HERE
          {/* SVG */}
        </RightGroup>
      </Wrapper>
    );
  }
}

export default Homeblock;