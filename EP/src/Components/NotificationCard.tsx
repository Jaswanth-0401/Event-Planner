import React from 'react';
import '../Styles/NotificationCard.css';

interface NotificationCardProps {
  message: string;
  timestamp: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ message, timestamp }) => {
  return (
    <div className="notification-card">
      <div className="notification-card-content">
        <p>{message}</p>
        <span className="notification-timestamp">{timestamp}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
