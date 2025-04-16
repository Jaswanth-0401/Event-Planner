import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="landing-about">
      <h2>About Us</h2>
      <p>
        College Event Planner is a one-stop platform for students and organizers to engage with college events.
        Whether it's a tech talk, cultural fest, or workshop — we've got it covered!
      </p>
      <div className="features-list">
        <div className="feature-item">
          <h3>🎉 Event Discovery</h3>
          <p>Browse upcoming college events with ease.</p>
        </div>
        <div className="feature-item">
          <h3>📝 Hassle-free Registration</h3>
          <p>One-click event registration and tracking.</p>
        </div>
        <div className="feature-item">
          <h3>⏰ Smart Reminders</h3>
          <p>Never miss an event with timely notifications.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
