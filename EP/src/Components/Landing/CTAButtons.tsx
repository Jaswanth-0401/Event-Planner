import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTAButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="cta-buttons">
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default CTAButtons;
