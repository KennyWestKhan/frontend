import axios from 'axios';

// The backend is running on local port 5000 (from server.js)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_URL,
});

// Intercept requests to attach the token if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
