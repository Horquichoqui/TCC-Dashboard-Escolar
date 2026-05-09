import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
