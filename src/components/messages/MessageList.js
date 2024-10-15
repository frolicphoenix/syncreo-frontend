// src/components/messages/MessageList.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function MessageList({ messages, userId }) {
  return (
    <Box sx={{ mb: 2, maxHeight: '60vh', overflowY: 'auto' }}>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: message.senderId === userId ? 'flex-end' : 'flex-start',
            mb: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor:
                message.senderId === userId ? 'primary.main' : 'grey.300',
              color: message.senderId === userId ? '#fff' : '#000',
              borderRadius: 2,
              p: 1,
              maxWidth: '70%',
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right' }}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MessageList;
