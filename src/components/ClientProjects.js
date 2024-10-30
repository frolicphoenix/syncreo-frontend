// src/components/ClientProjects.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import './ClientProjects.css';

function ClientProjects({ userId }) {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const response = await api.get(`/projects/client/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch your projects. Please try again later.');
      }
    };

    fetchClientProjects();
  }, [userId]);

  return (
    <div className="client-projects">
      <h2>Your Projects</h2>
      {error && <p className="error-message">{error}</p>}
      {projects.length > 0 ? (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              <Link to={`/projects/${project._id}`} className="project-title">{project.title}</Link>
              <p className="project-description">{project.description}</p>
              <p className="project-budget">Budget: ${project.budget}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects posted yet.</p>
      )}
    </div>
  );
}

export default ClientProjects;
