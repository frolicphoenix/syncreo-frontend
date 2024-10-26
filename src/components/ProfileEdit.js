// src/components/ProfileEdit.js
import React, { useState } from 'react';
import api from '../services/api';
import './ProfileEdit.css';

function ProfileEdit({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user._id}`, formData);
      setSuccess('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-edit-section">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
        <button type="submit">Save Changes</button>
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}

export default ProfileEdit;
