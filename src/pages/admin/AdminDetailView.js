// src/pages/admin/AdminDetailView.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './AdminDetailView.css';

function AdminDetailView() {
  const { type, id } = useParams(); // type can be "user" or "project"
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', title: '', description: '', budget: '' });

  const fetchData = useCallback(async () => {
    try {
      const endpoint = type === 'user' ? `/admin/users/${id}` : `/admin/projects/${id}`;
      const response = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setData(response.data);
      if (type === 'user') {
        setFormData({ name: response.data.name, email: response.data.email, role: response.data.role });
      } else {
        setFormData({ title: response.data.title, description: response.data.description, budget: response.data.budget });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [type, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const endpoint = type === 'user' ? `/admin/users/${id}` : `/admin/projects/${id}`;
      await api.put(endpoint, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      alert(`${type === 'user' ? 'User' : 'Project'} updated successfully`);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="admin-detail-view">
      <h2>{type === 'user' ? 'User' : 'Project'} Details</h2>
      {type === 'user' ? (
        <div>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          <label>Role</label>
          <input name="role" value={formData.role} onChange={handleChange} />
        </div>
      ) : (
        <div>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <label>Budget</label>
          <input name="budget" type="number" value={formData.budget} onChange={handleChange} />
        </div>
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default AdminDetailView;
