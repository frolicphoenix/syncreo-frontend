// src/pages/AdminProjects.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './AdminProjects.css';

function AdminProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/admin/projects'); // Ensure this route exists on your backend
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    await api.delete(`/admin/projects/${projectId}`);
    fetchProjects(); // Refresh the list after deletion
  };

  return (
    <div className="admin-projects">
      <h2>Manage Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="project-item">
            <p>{project.title}</p>
            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProjects;
