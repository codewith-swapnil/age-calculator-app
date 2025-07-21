// components/MessageBox.js (assumed structure)
import React from 'react';

const MessageBox = ({ message, type, show }) => {
  if (!show) {
    return null; // If not shown, it renders nothing
  }

  // Determine background color based on message type
  let backgroundColor = '';
  switch (type) {
    case 'success':
      backgroundColor = 'bg-green-100 border-green-400 text-green-700';
      break;
    case 'error':
      backgroundColor = 'bg-red-100 border-red-400 text-red-700';
      break;
    case 'info':
    default:
      backgroundColor = 'bg-blue-100 border-blue-400 text-blue-700';
      break;
  }

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 p-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${backgroundColor}`}
      // Problematic part might be here if 'style' is being set dynamically based on an initial null/undefined state
      // that is different on server vs client.
      // E.g., if you were doing inline style like style={{ display: show ? 'block' : 'none' }}
      // and 'show' state initializes differently.
    >
      {message}
    </div>
  );
};

export default MessageBox;