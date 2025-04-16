import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header'; 
import Sidebar from '../Components/Sidebar'; 
import '../Styles/StudentLayout.css';

const StudentLayout: React.FC = () => {
  return (
    <div className='student-layout'>
      <Header />
      <div className='middle'>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
