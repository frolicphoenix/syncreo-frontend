// src/components/auth/Login.js
import React, { useState } from 'react';
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
import { useNavigate, Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password, showPassword } = formData;

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
    setErrors({});
    setError(null);
  
    // Validate inputs
    let validationErrors = {};
  
    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
  
    if (password === '') {
      validationErrors.password = 'Password is required.';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
  
    try {
      // Make API call to log in user
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.msg || 'Invalid credentials');
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
          Login to SYNCREO
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={onSubmit}>
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
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register" color="primary">
              Register
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
