// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0ABAB5', // Vibrant Teal
    },
    secondary: {
      main: '#FF6F61', // Warm Coral
    },
    background: {
      default: '#F2F2F2', // Light Stone
    },
    text: {
      primary: '#3F3D56', // Deep Indigo
      secondary: '#6E7E85', // Slate Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
    },
    // ... other typography settings
  },
});

export default theme;
