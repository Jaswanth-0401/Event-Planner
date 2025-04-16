import React from 'react';
import '../../Styles/OrganizerHome.css';

const Home: React.FC = () => {
  // Mock data for events (you can replace this with real data later)
  const upcomingEvents = [
    { id: 1, title: 'Career Fair', date: '2025-05-10', location: 'Hall A', registeredCount: 50 },
    { id: 2, title: 'Math Quiz', date: '2025-04-20', location: 'Room 202', registeredCount: 30 },
  ];

  const pastEvents = [
    { id: 3, title: 'Music Concert', date: '2025-03-15', location: 'Auditorium' },
  ];

  const totalRegistrations = upcomingEvents.reduce((acc, event) => acc + event.registeredCount, 0);

  return (
    <div className="organizer-home">
      <h2>Welcome to Your Organizer Dashboard</h2>

      {/* Registration Summary */}
      <section className="summary">
        <div className="summary-card">
          <h4>Total Registrations</h4>
          <p>{totalRegistrations} students registered</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="event-list">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.registeredCount} students registered</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="past-events">
        <h3>Past Events</h3>
        <div className="event-list">
          {pastEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
