// src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to the backend API
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Set the default Axios authorization header
      setAuthToken(token);
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      // Handle errors (e.g., display error messages to the user)
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        {/* Email */}
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          type="email"
          fullWidth
          required
          margin="normal"
        />
        {/* Password */}
        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          fullWidth
          required
          margin="normal"
        />
        {/* Submit Button */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;
