import axios from 'axios';

// Cria uma instância do Axios com a URL base da nossa API
const api = axios.create({
  // CORREÇÃO: Usamos import.meta.env.VITE_API_URL em vez de process.env
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// O interceptor para adicionar o token permanece o mesmo
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('elevateToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;