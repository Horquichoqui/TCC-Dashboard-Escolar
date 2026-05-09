import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AlunosPage from './pages/AlunosPage';
import FaltasPage from './pages/FaltasPage';
import AlunosEmRiscoPage from './pages/AlunosEmRiscoPage';
import RelatoriosPage from './pages/RelatoriosPage';
import AjudaPage from './pages/AjudaPage';
import './App.css';

// Conteúdo principal: define todas as rotas do sistema
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Se não estiver logado, só mostra a tela de login */}
        {!isAuthenticated ? (
          <Route path="/login" element={<LoginPage />} />
        ) : (
          <>
            {/* Rotas disponíveis após o login */}
            <Route path="/dashboard"   element={<Layout><DashboardPage /></Layout>} />
            <Route path="/alunos"      element={<Layout><AlunosPage /></Layout>} />
            <Route path="/faltas"      element={<Layout><FaltasPage /></Layout>} />
            <Route path="/alunos-risco" element={<Layout><AlunosEmRiscoPage /></Layout>} />
            <Route path="/relatorios"  element={<Layout><RelatoriosPage /></Layout>} />
            <Route path="/ajuda"       element={<Layout><AjudaPage /></Layout>} />

            {/* Rota raiz redireciona para o dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </>
        )}

        {/* Qualquer rota desconhecida redireciona para o lugar certo */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

// Componente raiz: envolve tudo com o contexto de autenticação
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
