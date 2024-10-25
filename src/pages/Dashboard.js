// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects. Please log in.');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Available Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
              <p>{project.description}</p>
              <p>Budget: ${project.budget}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
}

export default Dashboard;
