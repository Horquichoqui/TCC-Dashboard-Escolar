import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

export default function Layout({ children }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="logo">
          <h2>📊 Dashboard</h2>
        </div>

        <nav className="menu">
          <Link to="/dashboard" className={`menu-item ${isActive('/dashboard')}`}>
            📈 Dashboard
          </Link>
          <Link to="/alunos" className={`menu-item ${isActive('/alunos')}`}>
            👥 Alunos
          </Link>
          <Link to="/faltas" className={`menu-item ${isActive('/faltas')}`}>
            📋 Faltas & Presença
          </Link>
          <Link to="/alunos-risco" className={`menu-item ${isActive('/alunos-risco')}`}>
            ⚠️ Alunos em Risco
          </Link>
          <Link to="/relatorios" className={`menu-item ${isActive('/relatorios')}`}>
            📊 Relatórios
          </Link>

          <div className="menu-divisor"></div>

          {usuario?.funcao === 'admin' && (
            <>
              <Link to="/disciplinas" className={`menu-item ${isActive('/disciplinas')}`}>
                📚 Disciplinas
              </Link>
              <Link to="/usuarios" className={`menu-item ${isActive('/usuarios')}`}>
                🔐 Usuários
              </Link>
            </>
          )}

          <div className="menu-divisor"></div>

          <Link to="/ajuda" className={`menu-item ${isActive('/ajuda')}`}>
            ❓ Ajuda & Tutorial
          </Link>
        </nav>

        <div className="user-info">
          <div className="user-avatar">
            {usuario?.nome?.charAt(0).toUpperCase()}
          </div>
          <div className="user-details">
            <p className="user-name">{usuario?.nome}</p>
            <p className="user-role">
              {usuario?.funcao === 'admin' ? '👨‍💼 Administrador' : '👨‍🏫 Professor'}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            🚪
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}
