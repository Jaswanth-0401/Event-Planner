import React, { useEffect, useState } from 'react';
import '../../Styles/MyEvents.css';
import EventCard from '../../Components/EventCard';
import SearchBar from '../../Components/SearchBar';

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

const MyEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'present' | 'past'>('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;

      setLoading(true);
      let endpoint = '';
      
      // Dynamic API endpoint based on the active tab
      if (activeTab === 'upcoming') {
        endpoint = `http://localhost:5000/api/registration/upcoming-events?student_id=${userId}`;
      } else if (activeTab === 'present') {
        endpoint = `http://localhost:5000/api/registration/present-events?student_id=${userId}`;
      } else if (activeTab === 'past') {
        endpoint = `http://localhost:5000/api/registration/past-events?student_id=${userId}`;
      }

      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (res.ok && Array.isArray(data.events)) {
          setEvents(data.events);
          setError('');
        } else {
          setEvents([]);
          setError('No events found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load events');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTab, userId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) return <p>Loading events...</p>;

    if (error) return <p className="error-message">{error}</p>;

    if (filteredEvents.length > 0) {
      return (
        <div className="event-list">
          {filteredEvents.map(event => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      );
    } else {
      return <p>No events found.</p>;
    }
  };

  return (
    <div className="my-events">
      <h2>My Events</h2>

      <div className="toggle-buttons">
        <button className={activeTab === 'upcoming' ? 'active' : ''} onClick={() => setActiveTab('upcoming')}>
          Upcoming
        </button>
        <button className={activeTab === 'present' ? 'active' : ''} onClick={() => setActiveTab('present')}>
          Present
        </button>
        <button className={activeTab === 'past' ? 'active' : ''} onClick={() => setActiveTab('past')}>
          Past
        </button>
      </div>

      <div className="event-section">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        {renderContent()}
      </div>
    </div>
  );
};

export default MyEvents;
