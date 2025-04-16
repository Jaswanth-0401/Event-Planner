import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/EventDetails.css';

interface Event {
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  organizerName: string;
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEventPassed, setIsEventPassed] = useState<boolean>(false);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5);
  };

  // Assuming student ID is stored in localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/events`);
        const data = await res.json();
        if (res.ok) {
          const foundEvent = data.events.find((e: Event) => e.event_id === Number(id));
          if (foundEvent) {
            setEvent(foundEvent);
            checkEventTime(foundEvent);
          }
        } else {
          console.error('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event details:', err);
      }
    };

    fetchEvent();
  }, [id]);

  // Check if the event time has already passed
  const checkEventTime = (event: Event) => {
    const eventDateTime = new Date(`${event.date} ${event.time}`);
    const currentDateTime = new Date();

    if (eventDateTime < currentDateTime) {
      setIsEventPassed(true);
    } else {
      setIsEventPassed(false);
    }
  };

  // Check if the user is already registered for the event
  useEffect(() => {
    const checkRegistration = async () => {
      if (userId && event) {
        try {
          const res = await fetch(`http://localhost:5000/api/registration/check?student_id=${userId}&event_id=${event.event_id}`);
          const data = await res.json();
          if (data.isRegistered) {
            setIsRegistered(true);
          }
        } catch (err) {
          console.error('Error checking registration:', err);
        }
      }
    };

    checkRegistration();
  }, [userId, event]);

  const handleRegister = async () => {
    if (!userId) {
      setMessage('User not logged in.');
      return;
    }

    if (!event) {
      setMessage('Event not found.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          event_id: event.event_id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsRegistered(true);
        setMessage('Successfully registered for the event!');
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error registering:', err);
      setMessage('Server error');
    }
  };

  const handleCancelRegistration = async () => {
    if (!userId) {
      setMessage('User not logged in.');
      return;
    }

    if (!event) {
      setMessage('Event not found.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/registration/cancel', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          event_id: event.event_id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Registration canceled successfully!');
      } else {
        setMessage(data.message || 'Failed to cancel registration');
      }
    } catch (err) {
      console.error('Error canceling registration:', err);
      setMessage('Server error');
    }
  };

  const handleShareButton = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {formatDate(event.date)}</p>
      <p><strong>Time:</strong> {formatTime(event.time)}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Organizer:</strong> {event.organizerName}</p>

      {isEventPassed ? (
        <button disabled>Event has already passed</button>
      ) : isRegistered ? (
        <button onClick={handleCancelRegistration}>Cancel Registration</button>
      ) : (
        <button onClick={handleRegister}>Register</button>
      )}

      {/* Share Button */}
      <button className="share-btn" onClick={handleShareButton}>Share</button>

      {message && <p>{message}</p>}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>X</button>
            <h3>Share Event</h3>
            <p>Share the event using the following links:</p>
            <ul>
              <li>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href={`mailto:?subject=Check out this event&body=${window.location.href}`} target="_blank" rel="noopener noreferrer">
                  Email
                </a>
              </li>
              <li>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)}>Copy Link</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
