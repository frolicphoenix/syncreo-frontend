// src/pages/ProjectList.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects', err);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Available Projects</h2>
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={handleSearch}
      />
      <ul>
        {filteredProjects.map((project) => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
