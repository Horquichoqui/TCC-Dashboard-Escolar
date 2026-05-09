import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Dashboard de Monitoramento</h1>
        <h2>Acesso ao Sistema</h2>

        <form onSubmit={handleSubmit}>
          {erro && <div className="erro-mensagem">{erro}</div>}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="credenciais-teste">
          <p>Credenciais de teste:</p>
          <ul>
            <li>Admin: admin@dashboard.com / password123</li>
            <li>Professor: joao@dashboard.com / password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
