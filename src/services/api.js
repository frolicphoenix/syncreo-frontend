import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://syncreo-backend-16cdca97e410.herokuapp.com/api',
});

// Ensure Authorization header is sent with each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API routes
export const fetchProjects = () => api.get('/projects');
export const fetchFreelancers = () => api.get('/freelancers');

// Messages API
export const fetchMessageThread = (userId) => api.get(`/messages/thread/${userId}`);

// Proposals API
export const fetchProposalsForFreelancer = (freelancerId) => api.get(`/proposals/freelancer/${freelancerId}`);
export const fetchProposalsForClient = (clientId) => api.get(`/proposals/client/${clientId}`);

export default api;
