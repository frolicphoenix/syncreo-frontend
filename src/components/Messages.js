// src/components/Messages.js
import React, { useEffect, useState } from 'react';
import { fetchMessageThread } from '../services/api'; // Importing API function
import './Messages.css';

function Messages({ userId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing");
      setError('User ID is missing. Please log in again.');
      return;
    }

    const getMessageThread = async () => {
      try {
        const response = await fetchMessageThread(userId); // Call API
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages.');
      }
    };

    getMessageThread();
  }, [userId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="messages-container">
      <h3>Messages</h3>
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}>
              <div className="message-sender">{msg.sender.name}</div>
              <div className="message-text">{msg.content}</div>
              <div className="message-timestamp">{new Date(msg.createdAt).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages available.</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
