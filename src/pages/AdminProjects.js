import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './AdminProjects.css';

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', budget: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await api.get('/admin/projects');
    setProjects(response.data);
  };

  const handleCreateProject = async () => {
    await api.post('/admin/projects', newProject);
    fetchProjects();
    setNewProject({ title: '', description: '', budget: '' });
  };

  const handleDeleteProject = async (projectId) => {
    await api.delete(`/admin/projects/${projectId}`);
    fetchProjects();
  };

  return (
    <div className="admin-projects">
      <h2>Manage Projects</h2>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project._id} className="project-item">
            <p>{project.title}</p>
            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="create-project">
        <h3>Create New Project</h3>
        <input type="text" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
        <input type="text" placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
        <input type="number" placeholder="Budget" value={newProject.budget} onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })} />
        <button onClick={handleCreateProject}>Create Project</button>
      </div>
    </div>
  );
}

export default AdminProjects;
