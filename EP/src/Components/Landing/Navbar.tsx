import React from 'react';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="landing-nav">
      <div className="logo">🎓 College Event Planner</div>
      <div className="nav-links">
        <button onClick={() => scrollToSection('hero')}>Home</button>
        <button onClick={() => scrollToSection('about')}>About</button>
        <button onClick={() => scrollToSection('cta')}>Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
