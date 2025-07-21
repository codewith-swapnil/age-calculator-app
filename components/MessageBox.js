// components/MessageBox.js
import React from 'react';

const MessageBox = ({ message, type, show }) => {
  // IMPORTANT: Only render the div if 'show' is true.
  // This prevents hydration mismatches for the 'style' attribute.
  if (!show) {
    return null;
  }

  let backgroundColorClass = '';
  let textColorClass = '';
  let borderColorClass = '';

  switch (type) {
    case 'success':
      backgroundColorClass = 'bg-green-100';
      borderColorClass = 'border-green-400';
      textColorClass = 'text-green-700';
      break;
    case 'error':
      backgroundColorClass = 'bg-red-100';
      borderColorClass = 'border-red-400';
      textColorClass = 'text-red-700';
      break;
    case 'info':
    default:
      backgroundColorClass = 'bg-blue-100';
      borderColorClass = 'border-blue-400';
      textColorClass = 'text-blue-700';
      break;
  }

  return (
    <div
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 p-3 rounded-lg shadow-lg z-50
        transition-all duration-300 transform
        ${backgroundColorClass} ${borderColorClass} ${textColorClass}
        border-l-4 sm:w-auto w-[calc(100%-2rem)] // Added responsive width
        text-sm sm:text-base // Adjusted text size for responsiveness
      `}
      role="alert" // For accessibility
      // No inline 'style' attribute here to avoid hydration errors
    >
      {message}
    </div>
  );
};

export default MessageBox;