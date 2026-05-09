import React, { createContext, useState, useCallback } from 'react';
import api from '../services/api';

// Contexto global de autenticação — compartilha o estado de login com toda a aplicação
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // Recupera o token salvo no navegador (persiste entre recarregamentos)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Faz login: envia email/senha para a API e salva o token recebido
  const login = useCallback(async (email, senha) => {
    setLoading(true);
    try {
      const response = await api.post('/login', { email, senha });
      if (response.data.success) {
        setToken(response.data.token);
        setUsuario(response.data.usuario);
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Faz logout: avisa o servidor e limpa todos os dados locais
  const logout = useCallback(async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setToken(null);
      setUsuario(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }, []);

  // Valores e funções disponíveis para todos os componentes filhos
  const value = {
    usuario,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token, // true se houver token salvo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para acessar o contexto de autenticação em qualquer componente
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
