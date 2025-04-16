import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/EventCard.css';

interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  organizerName: string;
}

interface Props {
  event: Event;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0]; 
  const isToday = event.date === today;
  const isUpcoming = event.date > today;
  const categoryTag = event.category ? event.category : 'Uncategorized';
  
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewDetails = () => {
    navigate(`/student/event/${event.event_id}`);
  };

  return (
    <div className={`event-card ${isUpcoming ? 'upcoming' : ''}`}>
      <h3>{event.title}</h3>
      
      <div className="event-info">
        <p><strong>Date:</strong> {formatDate(event.date)}</p>
        <p><strong>Time:</strong> {event.time.slice(0,5)} IST</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizerName}</p>
        
        {isToday && (
          <span className="today-tag">Today</span>
        )}
      </div>

      <div className="event-category">
        <span className="category-tag">{categoryTag}</span>
      </div>

      {/* View Details button is always present */}
      <button onClick={handleViewDetails}>View Details</button>
    </div>
  );
};

export default EventCard;
