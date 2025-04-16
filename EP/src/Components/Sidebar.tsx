import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarCheck, BellRing, PlusCircle, ClipboardList } from 'lucide-react';
import '../Styles/Sidebar.css';

const Sidebar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  if (!role) return <div>Loading...</div>;

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link
            to={`/${role}/home`}
            className={location.pathname === `/${role}/home` ? 'active' : ''}
          >
            <Home size={18} /> <span>Home</span>
          </Link>
        </li>
        {role === 'student' ? (
          <>
            <li>
              <Link
                to="/student/myevents"
                className={location.pathname === '/student/myevents' ? 'active' : ''}
              >
                <CalendarCheck size={18} /> <span>My Events</span>
              </Link>
            </li>
            <li>
              <Link
                to="/student/reminders"
                className={location.pathname === '/student/reminders' ? 'active' : ''}
              >
                <BellRing size={18} /> <span>Reminders</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/organizer/addevent"
                className={location.pathname === '/organizer/addevent' ? 'active' : ''}
              >
                <PlusCircle size={18} /> <span>Add Event</span>
              </Link>
            </li>
            <li>
              <Link
                to="/organizer/myevents"
                className={location.pathname === '/organizer/myevents' ? 'active' : ''}
              >
                <ClipboardList size={18} /> <span>My Events</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
