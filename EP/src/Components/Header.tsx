import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bell, LogOut } from 'lucide-react';
import '../Styles/Header.css';

const Header: React.FC = () => {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h2>Event Planner</h2>
      </div>
      <div className="header-right">
        <Link to={`/${role}/notifications`} aria-label="Notifications">
          <Bell size={24} />
        </Link>

        <Link to={`/${role}/profile`} aria-label="Profile">
          <User size={24} />
        </Link>
        
        <button onClick={handleLogout} className="logout-button" aria-label="Logout">
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
