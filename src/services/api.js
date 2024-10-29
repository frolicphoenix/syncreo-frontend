import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://syncreo-backend-16cdca97e410.herokuapp.com/',
});

// Routes for projects and freelancers
export const fetchProjects = () => api.get('/projects');
export const fetchFreelancers = () => api.get('/freelancers');

export default api;
