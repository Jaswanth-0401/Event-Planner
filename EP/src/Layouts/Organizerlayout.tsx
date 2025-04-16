import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header'; 
import Sidebar from '../Components/Sidebar'; 
import '../Styles/OrganizerLayout.css';

const OrganizerLayout: React.FC = () => {
  return (
    <div className="organizer-layout">
      <Header />
      <div className="middle">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OrganizerLayout;
