// src/pages/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProject(response.data);
      } catch (err) {
        setError('Failed to load project details.');
      }
    };

    fetchProject();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {project ? (
        <>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Budget: ${project.budget}</p>
          <p>Posted by: {project.client.name}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
