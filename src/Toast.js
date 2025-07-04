import React from 'react';
import './Toast.css';

export default function Toast({ message, show }) {
  return (
    <div className={`toast-notification${show ? ' show' : ''}`}>
      {message}
    </div>
  );
} 