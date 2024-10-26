// src/components/MessageList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MessageList({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
//   const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/messages/project/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    fetchMessages();
  }, [projectId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        '/messages',
        { projectId, content: newMessage },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div>
      <h3>Messages</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message) => (
          <div key={message._id}>
            <p><strong>{message.sender.name}</strong>: {message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageList;
