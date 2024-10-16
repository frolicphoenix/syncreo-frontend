// src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const token = res.data.token;
      const userRole = res.data.user.role; // Get user role from response

      // Store token and user role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);

      // Set default headers for axios
      axios.defaults.headers.common['x-auth-token'] = token;

      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={onSubmit}>
        {/* Email Field */}
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={onChange}
          fullWidth
          required
          margin="normal"
        />
        {/* Password Field */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          fullWidth
          required
          margin="normal"
        />
        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Login;
