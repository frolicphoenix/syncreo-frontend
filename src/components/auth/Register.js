// src/components/auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';

import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer', // or 'client'
  });

  const { name, email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Implement registration logic
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      // Handle successful registration (e.g., redirect, show message)
    } catch (err) {
      console.error(err.response.data);
      // Handle errors (e.g., display error messages)
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={onChange}
          fullWidth
          required
          margin="normal"
        />
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
        {/* Role */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select name="role" value={role} onChange={onChange}>
            <MenuItem value="freelancer">Freelancer</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        </FormControl>
        {/* Submit Button */}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default Register;
