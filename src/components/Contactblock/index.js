import React from 'react';
import { AboutSection, AboutText, ContactPhoto, ContactSection, Link, Wrapper } from './styled';
import Vish from '../assets/vish.png';
import Viraj from '../assets/viraj.png';
import Sherwin from '../assets/sherwin.png';
import Nicole from '../assets/nicole.png';

class Contactblock extends React.Component {
  render() {
    return(
      <Wrapper>
        {/* <h2 style={{ textDecoration: 'underline', background: 'inherit', paddingBottom: '20px' }}>Who we are</h2> */}
        {/* VISH */}
          <ContactSection>
            <ContactPhoto src={Vish} alt="VISH" />
            <AboutSection className="changeColor">
              <div style={{ backgroundColor: 'inherit' }}>Vishwas Shukla</div>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
            <Link href="https://github.com/vishshukla" >See Vish's work</Link>
          </ContactSection>
        {/* VIRAJ */}
          <ContactSection>
            <ContactPhoto src={Viraj} alt="VIRAJ" />
            <AboutSection className="changeColor">
              <div style={{ margin:'10px', backgroundColor: 'inherit' }}>Viraj Dhillon</div>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
            <Link href="https://github.com/VirajDhillon">See Viraj's work</Link>
          </ContactSection>
        {/* SHERWIN */}
          <ContactSection>
            <ContactPhoto src={Sherwin} alt="SHERWIN" />
            <AboutSection className="changeColor">
              <div style={{ margin: '10px', backgroundColor: 'inherit' }}>Sherwin Sahebi</div>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
            <Link href="https://github.com/Sherv24">See Sherwin's work</Link>
          </ContactSection>
        {/* NICOLE */}
          <ContactSection>
            <ContactPhoto src={Nicole} alt="NICOLE" />
            <AboutSection className="changeColor">
              <div style={{ margin:'10px', backgroundColor: 'inherit' }}>Nicole Nguyen</div>
              <AboutText>4th Year</AboutText>
              <AboutText>Computer Science</AboutText>
            </AboutSection>
            <Link href="https://github.com/nicohhle">See Nicole's work</Link>
          </ContactSection>
      </Wrapper>
    );
  }
}

export default Contactblock;
