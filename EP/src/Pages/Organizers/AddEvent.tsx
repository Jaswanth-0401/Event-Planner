import React, { useState, useEffect } from 'react';
import '../../Styles/AddEvent.css';

const AddEvent: React.FC = () => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
  });

  const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories');
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const organizerId = localStorage.getItem('userId');
    if (!organizerId) return alert('Organizer not found.');

    try {
      const res = await fetch('http://localhost:5000/api/events/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...eventDetails, organizer_id: organizerId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Event created successfully!');
        setEventDetails({ title: '', date: '', time: '', location: '', description: '', category: '' });
      } else {
        alert(data.message || 'Failed to create event.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <div className="add-event">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Event Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            placeholder="Enter event location"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Event Category</label>
          <select
            id="category"
            name="category"
            value={eventDetails.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
