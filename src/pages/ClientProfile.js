// src/pages/ClientProfile.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ClientProfile.css';

function ClientProfile() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientProjects = async () => {
      try {
        const response = await api.get('/projects/client-projects', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching client projects:', error);
        setError('Failed to fetch your projects.');
      }
    };

    fetchClientProjects();
  }, []);

  return (
    <div className="client-profile">
      <h2>Your Projects</h2>
      {error && <p className="error-message">{error}</p>}
      
      {projects.length > 0 ? (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project._id} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Budget: ${project.budget}</p>
              {/* Add link to view project details if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects posted yet.</p>
      )}
    </div>
  );
}

export default ClientProfile;
