import axios from 'axios';

// URL da API: usa variável de ambiente em produção, proxy local em desenvolvimento
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Carrega o token salvo no navegador e envia em todas as requisições
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
