// ============================================================
// CONFIGURAÇÃO DO AXIOS — api.js
// ============================================================
// O Axios é a biblioteca responsável por fazer as chamadas HTTP
// do frontend para o backend Express.
//
// Em desenvolvimento: usa http://localhost:3000/api
// Em produção no Render: usa /api (mesma URL, sem CORS)
// ============================================================

import axios from "axios";

// Cria uma instância do Axios já configurada com a URL base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Interceptor de requisição: adiciona o token JWT em todos os pedidos ao backend
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta: se o servidor retornar 401 (token expirado),
// remove o token salvo e redireciona o usuário para a tela de login
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if (erro.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(erro);
  }
);

export default api;
