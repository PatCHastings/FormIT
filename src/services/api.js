import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL || ''}/api`;

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

export const getClient = async () => {
    const response = await api.get('/clients');
    return response.data;
  };
  
  export const createClient = async (client) => {
    const response = await api.post('/clients', client);
    return response.data;
  };
  
  export const updateClient = async (clientId, updatedData) => {
    const response = await api.put(`/clients/${clientId}`, updatedData);
    return response.data;
  };
  
  export const deleteClient = async (clientId) => {
    const response = await api.delete(`/clients/${clientId}`);
    return response.data;
  };

export default api;