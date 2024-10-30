// src/components/Messages.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Messages.css';

function Messages({ userId }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Fetched messages:', response.data); // Debug: log messages
        setMessages(response.data);
      } catch (err) {
        console.error('Error fetching messages:', err); // Log the error
        setError('Failed to load messages.');
      }
    };

    fetchMessages();
  }, [userId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="messages-container">
      <h3>Messages</h3>
      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
              <div className="message-sender">{msg.senderName}</div>
              <div className="message-text">{msg.text}</div>
              <div className="message-timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
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
