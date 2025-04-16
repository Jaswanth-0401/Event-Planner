import React, { useState } from 'react';
import NotificationCard from '../../Components/NotificationCard';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const Notifications: React.FC = () => {
  // Mock notifications (this would come from your backend in a real application)
  const [notifications] = useState<Notification[]>([
    { id: 1, message: 'Event "Tech Talk" is starting in 1 hour.', timestamp: '2025-04-20 10:00 AM' },
    { id: 2, message: 'New event "Music Concert" added!', timestamp: '2025-04-19 4:00 PM' },
    { id: 3, message: 'Reminder: "Coding Bootcamp" is tomorrow.', timestamp: '2025-04-20 9:00 AM' },
  ]);

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <NotificationCard 
            key={notification.id} 
            message={notification.message} 
            timestamp={notification.timestamp} 
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
