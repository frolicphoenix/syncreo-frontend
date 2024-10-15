// src/components/messages/MessageInput.js
import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getSocket } from '../../utils/socket';

function MessageInput({ recipientId, userId }) {
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = () => {
    if (messageContent.trim() === '') return;

    const messageData = {
      senderId: userId,
      recipientId,
      content: messageContent,
      timestamp: new Date(),
    };

    // Emit the message via Socket.io
    const socket = getSocket();
    socket.emit('sendMessage', messageData);

    // Optionally, you can add the message to the local state to display immediately
    setMessageContent('');
  };

  return (
    <Box sx={{ display: 'flex', mt: 2 }}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Type your message..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
