// src/components/Messages.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Messages.css';

function Messages({ userId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/${userId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [userId]);

  return (
    <div className="messages-section">
      <h3>Messages</h3>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.sender.name}</strong>: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;
