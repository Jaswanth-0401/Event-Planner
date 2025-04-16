import React from 'react';
import Navbar from '../Components/Landing/Navbar';
import Hero from '../Components/Landing/Hero';
import About from '../Components/Landing/About';
import CTA from '../Components/Landing/CTA';
import '../Styles/Landing/Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <Navbar />
      <Hero />
      <About />
      <CTA />
    </div>
  );
};

export default Landing;
