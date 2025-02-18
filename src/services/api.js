import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `${process.env.REACT_APP_API_BASE_URL}/api` || 'https://api.formit-software.com/api'
    : 'http://localhost:5000/api';

console.log(`Using API Base URL: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add the token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;