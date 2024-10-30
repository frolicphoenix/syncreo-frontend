// src/components/Messages.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Messages.css';

function Messages({ userId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/user/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div className="messages-container">
      <h3>Messages</h3>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
            <div className="message-sender">{msg.senderName}</div>
            <div className="message-text">{msg.text}</div>
            <div className="message-timestamp">{new Date(msg.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
