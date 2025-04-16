import React from 'react';
import CTAButtons from './CTAButtons';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="landing-hero">
      <h1>Discover, Track, and Attend College Events</h1>
      <p>Stay connected with everything happening on campus</p>
      <CTAButtons />
    </section>
  );
};

export default Hero;
