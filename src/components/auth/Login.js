// src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // Implement login logic
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      console.log(res.data);
      // Store the token, update auth state, redirect, etc.
    } catch (err) {
      console.error(err.response.data);
      // Handle errors
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
