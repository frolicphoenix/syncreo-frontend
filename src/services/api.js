import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://syncreo-backend-16cdca97e410.herokuapp.com/api',
});

// Routes for projects and freelancers
export const fetchProjects = () => api.get('/projects');
export const fetchFreelancers = () => api.get('/freelancers');
export const fetchClientProposals = () => api.get('/proposals/client', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const fetchFreelancerProposals = () => api.get('/proposals/freelancer', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});


export default api;
