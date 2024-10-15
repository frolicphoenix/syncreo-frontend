// src/components/messages/MessagingPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { connectSocket, getSocket } from '../../utils/socket';
import axios from 'axios';

function MessagingPage() {
  const [messages, setMessages] = useState([]);
  const [recipientId, setRecipientId] = useState(''); // The ID of the user you're messaging
  const userId = localStorage.getItem('userId'); // Assume user ID is stored in localStorage

  useEffect(() => {
    // Connect to Socket.io
    const socket = connectSocket(userId);

    // Listen for incoming messages
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Fetch existing messages from the backend
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${recipientId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (recipientId) {
      fetchMessages();
    }

    return () => {
      socket.disconnect();
    };
  }, [recipientId, userId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Messaging
      </Typography>
      {/* You can add a component to select or display the recipient's information */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Chat with [Recipient's Name]</Typography>
      </Box>
      <MessageList messages={messages} userId={userId} />
      <MessageInput recipientId={recipientId} userId={userId} />
    </Container>
  );
}

export default MessagingPage;
