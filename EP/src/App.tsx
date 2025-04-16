import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Register from './Pages/Register';
import StudentLayout from './Layouts/StudentLayout';
import OrganizerLayout from './Layouts/Organizerlayout'
import StudentHome from './Pages/Students/Home';
import StudentMyEvents from './Pages/Students/MyEvents';
import StudentReminders from './Pages/Students/Reminders';
import OrganizerHome from './Pages/Organizers/Home';
import AddEvent from './Pages/Organizers/AddEvent';
import OrganizerMyEvents from './Pages/Organizers/MyEvents';
import Notifications from './Pages/Students/Notifications';
import Profile from './Pages/Students/Profile';
import { UserProvider } from './Context/UserContext';
import EventDetails from './Pages/Students/EventDetails';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Landing, Login, Register */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route path="home" element={<StudentHome />} />
            <Route path="myevents" element={<StudentMyEvents />} />
            <Route path="reminders" element={<StudentReminders />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile/>} />
            <Route path="/student/event/:id" element={<EventDetails />} />
            <Route index element={<Navigate to="/student/home" replace />} />
          </Route>

          {/* Organizer Routes */}
          <Route path="/organizer" element={<OrganizerLayout />}>
            <Route path="home" element={<OrganizerHome />} />
            <Route path="addevent" element={<AddEvent />} />
            <Route path="myevents" element={<OrganizerMyEvents />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile/>} />
            <Route index element={<Navigate to="/organizer/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
