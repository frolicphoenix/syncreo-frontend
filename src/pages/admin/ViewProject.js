// src/pages/admin/ViewProject.js
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './ViewProject.css';

function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', budget: '' });

  const fetchProject = useCallback(async () => {
    try {
      const response = await api.get(`/admin/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      setProject(response.data);
      setFormData({ title: response.data.title, description: response.data.description, budget: response.data.budget });
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/admin/projects/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      alert('Project updated successfully');
      fetchProject();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="view-project">
      <h2>View/Edit Project</h2>
      {project ? (
        <div>
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          <label>Budget</label>
          <input name="budget" type="number" value={formData.budget} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <p>Loading project data...</p>
      )}
    </div>
  );
}

export default ViewProject;
