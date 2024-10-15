// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import theme from './theme';
import './global.css';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
