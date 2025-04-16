import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/Reminders.css';

interface Reminder {
  reminder_id: number;
  reminder_time: string;
  event_id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizerName: string;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const userId = localStorage.getItem('userId');  

  useEffect(() => {
    if (!userId) return; 

    const fetchReminders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reminders/user?user_id=${userId}`);
        setReminders(res.data.reminders);
      } catch (err) {
        console.error('Error fetching reminders:', err);
      }
    };

    fetchReminders();
  }, [userId]);

  return (
    <div className="reminders-page">
      <h2>Your Reminders</h2>
      {reminders.length === 0 ? (
        <p>No reminders set yet.</p>
      ) : (
        <ul className="reminders-list">
          {reminders.map((reminder) => {
            const reminderDate = new Date(reminder.reminder_time).toLocaleString();
            return (
              <li key={reminder.reminder_id} className="reminder-card">
                <h3>{reminder.title}</h3>
                <p><strong>Reminder Time:</strong> {reminderDate}</p>
                <p><strong>Event Date:</strong> {new Date(reminder.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {reminder.time}</p>
                <p><strong>Location:</strong> {reminder.location}</p>
                <p><strong>Organizer:</strong> {reminder.organizerName}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Reminders;
