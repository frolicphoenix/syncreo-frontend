import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Routes for projects and freelancers
export const fetchProjects = () => api.get('/projects');
export const fetchFreelancers = () => api.get('/freelancers');

export default api;
