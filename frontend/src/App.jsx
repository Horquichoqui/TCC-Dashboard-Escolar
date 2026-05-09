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

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/login" element={<LoginPage />} />
        ) : (
          <>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
            <Route
              path="/alunos"
              element={
                <Layout>
                  <AlunosPage />
                </Layout>
              }
            />
            <Route
              path="/faltas"
              element={
                <Layout>
                  <FaltasPage />
                </Layout>
              }
            />
            <Route
              path="/alunos-risco"
              element={
                <Layout>
                  <AlunosEmRiscoPage />
                </Layout>
              }
            />
            <Route
              path="/relatorios"
              element={
                <Layout>
                  <RelatoriosPage />
                </Layout>
              }
            />
            <Route
              path="/ajuda"
              element={
                <Layout>
                  <AjudaPage />
                </Layout>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
