// src/pages/admin/AdminProjects.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AdminProjects.css';

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/projects', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    await api.delete(`/admin/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    });
    fetchProjects();
  };

  const handleViewProject = (projectId) => {
    navigate(`/admin/projects/${projectId}`);
  };

  return (
    <div className="admin-projects">
      <h2>Manage Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="project-item">
            <p>{project.title}</p>
            <div>
              <button onClick={() => handleViewProject(project._id)}>View</button>
              <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProjects;
