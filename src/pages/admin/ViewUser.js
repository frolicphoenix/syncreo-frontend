// src/pages/admin/ViewUser.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './ViewUser.css';

function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setUser(response.data);
      setFormData({ name: response.data.name, email: response.data.email, role: response.data.role });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/admin/users/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      alert('User updated successfully');
      fetchUser();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="view-user">
      <h2>View/Edit User</h2>
      {user ? (
        <div>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          <label>Role</label>
          <input name="role" value={formData.role} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ViewUser;
