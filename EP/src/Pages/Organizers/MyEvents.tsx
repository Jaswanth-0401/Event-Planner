import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/OrgMyEvents.css';

const mockEvents = [
  { id: 1, title: 'Career Fair', date: '2025-05-10', location: 'Hall A', category: 'Career', description: 'A career fair with various companies looking for talent.' },
  { id: 2, title: 'Math Quiz', date: '2025-04-20', location: 'Room 202', category: 'Academic', description: 'A fun and challenging math quiz event.' },
];

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState(mockEvents); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Here you would typically fetch the events data from the backend
    // For now, we're using mock data.
    setLoading(true);
    // Simulating an API call delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="my-events">
      <h2>My Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        <div className="event-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p>{event.description}</p>
              <div className="event-actions">
                <Link to={`/organizer/edit-event/${event.id}`} className="edit-button">Edit</Link>
                <button className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default MyEvents;
