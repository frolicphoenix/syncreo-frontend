// src/utils/socket.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = (userId) => {
  socket = io('http://localhost:5000', {
    query: { userId },
  });
  return socket;
};

export const getSocket = () => {
  return socket;
};
