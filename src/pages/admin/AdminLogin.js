// src/pages/admin/AdminLogin.js
import React, { useState } from 'react';
import api from '../../services/api';
import './AdminLogin.css';

function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    console.log("Admin login button clicked");

    try {
      const response = await api.post('/admin/auth/login', formData);
      console.log("Admin login response:", response.data);

      const { token, user } = response.data;

      if (user?.role === 'admin') {
        // Save token to localStorage
        localStorage.setItem('adminToken', token);
        console.log("Admin token set in localStorage:", localStorage.getItem('adminToken'));

        // Redirect after confirming token is set
        if (localStorage.getItem('adminToken')) {
          console.log("Redirecting to admin dashboard...");
          window.location.href = '/admin/dashboard';
        }
      } else {
        console.log("Access denied for non-admin");
        setError('Access denied.');
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError('Admin login failed. Please check your credentials.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
