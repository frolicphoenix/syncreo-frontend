// src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects.');
    }
  };

  const handleDeleteUser = async (userId) => {
    await api.delete(`/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
    fetchUsers();
  };

  const handleDeleteProject = async (projectId) => {
    await api.delete(`/admin/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
    fetchProjects();
  };

  const handleViewUser = (userId) => {
    navigate(`/admin/details/user/${userId}`);
  };

  const handleViewProject = (projectId) => {
    navigate(`/admin/details/project/${projectId}`);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <p className="error-message">{error}</p>}

      <div className="list-section">
        <h2>Users</h2>
        <ul className="list">
          {users.map((user) => (
            <li key={user._id} className="list-item">
              <span>{user.name} - {user.email}</span>
              <div className="button-group">
                <button onClick={() => handleViewUser(user._id)}>View</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="list-section">
        <h2>Projects</h2>
        <ul className="list">
          {projects.map((project) => (
            <li key={project._id} className="list-item">
              <span>{project.title}</span>
              <div className="button-group">
                <button onClick={() => handleViewProject(project._id)}>View</button>
                <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
