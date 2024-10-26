// src/pages/NewProject.js
import React, { useState } from 'react';
import api from '../services/api';
import './NewProject.css';

function NewProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/projects', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSuccess('Project posted successfully.');
      setFormData({ title: '', description: '', budget: '' }); // Reset form
    } catch (err) {
      setError('Failed to post project. Make sure you are logged in as a client.');
    }
  };

  return (
    <div className="new-project-page">
      <div className="new-project-card">
        <h2>Post a New Project</h2>
        <form onSubmit={handleSubmit} className="new-project-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Post Project</button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default NewProject;
