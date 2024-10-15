// src/components/auth/Register.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer', // default role
    showPassword: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Validates email format using a regular expression
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Checks if password meets minimum length requirement
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);


  const { name, email, password, role, showPassword } = formData;

  useEffect(() => {
    // Get role from state if coming from role selection
    if (location.state && location.state.role) {
      setFormData((prevData) => ({ ...prevData, role: location.state.role }));
    }
  }, [location.state]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    setError(null); // Reset general error
    setSuccess(null); // Reset success message
  
    // Validate inputs
    let validationErrors = {};
  
    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
  
    if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 6 characters long.';
    }
  
    if (name.trim() === '') {
      validationErrors.name = 'Name is required.';
    }
  
    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      // Make API call to register user
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          boxShadow: 3,
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
          Create Your Account
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={onSubmit}>
          {/* Name */}
          <TextField
            label="Full Name"
            name="name"
            value={name}
            onChange={onChange}
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">👤</InputAdornment>,
            }}
          />
          {/* Email */}
          <TextField
            label="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            type="email"
            fullWidth
            required
            margin="normal"
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
          />
          {/* Password */}
          <TextField
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            margin="normal"
            helperText="Password must be at least 6 characters"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Role (Read-Only) */}
          <TextField
            label="Role"
            name="role"
            value={role.charAt(0).toUpperCase() + role.slice(1)}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start">🛠️</InputAdornment>,
            }}
          />
          {/* Submit Button */}
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" color="primary">
              Login
            </MuiLink>
          </Typography>
        </Box>
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Register;
