import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

// Layout principal: envolve todas as páginas com a sidebar de navegação
export default function Layout({ children }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Retorna 'active' se a rota atual bate com o link — destaca o item no menu
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="layout">
      {/* Barra lateral de navegação */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Dashboard</h2>
        </div>

        <nav className="menu">
          <Link to="/dashboard"    className={`menu-item ${isActive('/dashboard')}`}>
            📈 Dashboard
          </Link>
          <Link to="/alunos"       className={`menu-item ${isActive('/alunos')}`}>
            👥 Alunos
          </Link>
          <Link to="/faltas"       className={`menu-item ${isActive('/faltas')}`}>
            📋 Faltas &amp; Presença
          </Link>
          <Link to="/alunos-risco" className={`menu-item ${isActive('/alunos-risco')}`}>
            ⚠️ Alunos em Risco
          </Link>
          <Link to="/relatorios"   className={`menu-item ${isActive('/relatorios')}`}>
            📊 Relatórios
          </Link>

          <div className="menu-divisor"></div>

          <Link to="/ajuda" className={`menu-item ${isActive('/ajuda')}`}>
            ❓ Ajuda &amp; Tutorial
          </Link>
        </nav>

        {/* Rodapé da sidebar: nome do usuário e botão de sair */}
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
          <button className="logout-btn" onClick={handleLogout} title="Sair do sistema">
            🚪
          </button>
        </div>
      </aside>

      {/* Área principal onde cada página é renderizada */}
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}
