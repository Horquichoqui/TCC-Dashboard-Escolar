import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/AlunosPage.css';

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [filtroTurma, setFiltroTurma] = useState('');
  const [filtroNome, setFiltroNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [turmas, setTurmas] = useState([]);

  // Carrega os alunos ao abrir a página
  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      const response = await api.get('/alunos');
      setAlunos(response.data.alunos);

      // Extrai a lista de turmas únicas para o filtro
      const turmasUnicas = [...new Set(response.data.alunos.map((a) => a.turma))];
      setTurmas(turmasUnicas.sort());
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtra localmente: combina os dois filtros (turma E nome)
  const alunosFiltrados = alunos.filter((aluno) => {
    const matchTurma = !filtroTurma || aluno.turma === filtroTurma;
    const matchNome = !filtroNome || aluno.nome.toLowerCase().includes(filtroNome.toLowerCase());
    return matchTurma && matchNome;
  });

  if (loading) {
    return <div className="alunos-loading">Carregando alunos...</div>;
  }

  return (
    <div className="alunos-page">
      <h1>Gerenciamento de Alunos</h1>

      {/* Filtros de busca */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="filtro-input"
        />
        <select
          value={filtroTurma}
          onChange={(e) => setFiltroTurma(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas as turmas</option>
          {turmas.map((turma) => (
            <option key={turma} value={turma}>Turma {turma}</option>
          ))}
        </select>
      </div>

      {/* Grade com cards dos alunos */}
      <div className="alunos-container">
        {alunosFiltrados.length === 0 ? (
          <p className="sem-resultados">Nenhum aluno encontrado</p>
        ) : (
          <div className="alunos-grid">
            {alunosFiltrados.map((aluno) => (
              <div key={aluno.id} className="aluno-card">
                {/* Iniciais do nome como avatar */}
                <div className="aluno-avatar">
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <div className="aluno-info">
                  <h3>{aluno.nome}</h3>
                  <p className="matricula">Matrícula: {aluno.matricula}</p>
                  <p className="turma">Turma: {aluno.turma}</p>
                  {aluno.email && <p className="email">{aluno.email}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
