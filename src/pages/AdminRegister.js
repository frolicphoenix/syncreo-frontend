// src/pages/AdminRegister.js
import React, { useState } from 'react';
import api from '../services/api';
import './AdminRegister.css';

function AdminRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/admin/auth/register', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setSuccess('Admin registered successfully. You can now log in.');
      window.location.href = '/admin/login';
    } catch (err) {
      setError('Admin registration failed. Please try again.');
    }
  };

  return (
    <div className="admin-register-page">
      <div className="admin-register-container">
        <h2>Admin Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
