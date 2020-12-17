import React from 'react';
import { AboutSection, AboutText, ContactPhoto, ContactSection, Wrapper } from './styled';
import Vish from '../assets/vish.png';
import Viraj from '../assets/viraj.png';
import Sherwin from '../assets/sherwin.png';
import Nicole from '../assets/nicole.png';

class Contactblock extends React.Component {
  render() {
    return(
      <Wrapper>
        {/* VISH */}
          <ContactSection>
            <ContactPhoto src={Vish} alt="VISH" />
            <AboutSection>
              <h2 style={{ backgroundColor: 'inherit' }}>Vishwas Shukla</h2>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
          </ContactSection>
        {/* VIRAJ */}
          <ContactSection>
            <ContactPhoto src={Viraj} alt="VIRAJ" />
            <AboutSection>
              <h2 style={{ backgroundColor: 'inherit' }}>Viraj Dhillon</h2>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
          </ContactSection>
        {/* SHERWIN */}
          <ContactSection>
            <ContactPhoto src={Sherwin} alt="SHERWIN" />
            <AboutSection>
              <h2 style={{ backgroundColor: 'inherit' }}>Sherwin Sahebi</h2>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
          </ContactSection>
        {/* NICOLE */}
          <ContactSection>
            <ContactPhoto src={Nicole} alt="NICOLE" />
            <AboutSection>
              <h2 style={{ backgroundColor: 'inherit' }}>Nicole Nguyen</h2>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
          </ContactSection>
      </Wrapper>
    );
  }
}

export default Contactblock;
