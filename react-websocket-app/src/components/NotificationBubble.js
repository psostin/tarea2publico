import React, { useEffect } from 'react';
import '../css/NotificationBubble.css';

const NotificationBubble = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // Close the bubble after 10 seconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, [onClose]);

  return (
    <div className="notification-bubble">
      <p>{message}</p>
    </div>
  );
};

export default NotificationBubble;
