import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import api from '../services/api';
import '../styles/DashboardPage.css';

// Cores para diferenciar as turmas no gráfico de pizza
const CORES_TURMAS = ['#D4A017', '#1a1a1a', '#8B6914', '#4a4a4a', '#B8860B', '#6b6b6b'];

export default function DashboardPage() {
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAlunos: 0,
    alunosEmRisco: 0,
    frequenciaMedia: 0,
  });

  // Carrega os dados ao abrir a página
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [alunosRes, notasRes] = await Promise.all([
        api.get('/alunos'),
        api.get('/notas'),
      ]);

      setAlunos(alunosRes.data.alunos);
      setNotas(notasRes.data.notas);
      calcularEstatisticas(alunosRes.data.alunos, notasRes.data.notas);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcula quantos alunos estão abaixo da média (nota < 6)
  const calcularEstatisticas = (alunos, notas) => {
    const mediasPorAluno = {};
    notas.forEach((nota) => {
      if (!mediasPorAluno[nota.aluno_id]) {
        mediasPorAluno[nota.aluno_id] = [];
      }
      mediasPorAluno[nota.aluno_id].push(nota.valor_nota);
    });

    let alunosEmRisco = 0;
    Object.values(mediasPorAluno).forEach((notasAluno) => {
      const media = notasAluno.reduce((a, b) => a + b, 0) / notasAluno.length;
      if (media < 6) alunosEmRisco++;
    });

    setStats({ totalAlunos: alunos.length, alunosEmRisco, frequenciaMedia: 85 });
  };

  // Dados para o gráfico de barras: média dos primeiros 5 alunos
  const dadosMediasPorAluno = alunos.slice(0, 5).map((aluno) => {
    const notasAluno = notas.filter((n) => n.aluno_id === aluno.id);
    const media = notasAluno.length > 0
      ? (notasAluno.reduce((a, b) => a + b.valor_nota, 0) / notasAluno.length).toFixed(1)
      : 0;
    return { nome: aluno.nome.split(' ')[0], media: parseFloat(media) };
  });

  // Dados para o gráfico de pizza: quantidade de alunos por turma
  const distribuicaoPorTurma = {};
  alunos.forEach((aluno) => {
    distribuicaoPorTurma[aluno.turma] = (distribuicaoPorTurma[aluno.turma] || 0) + 1;
  });
  const dadosTurmas = Object.entries(distribuicaoPorTurma).map(([turma, count]) => ({
    name: turma,
    value: count,
  }));

  if (loading) {
    return <div className="dashboard-loading">Carregando dados...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard de Monitoramento de Alunos</h1>

      {/* Cards com números rápidos */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total de Alunos</p>
            <p className="stat-value">{stats.totalAlunos}</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <p className="stat-label">Alunos em Risco</p>
            <p className="stat-value">{stats.alunosEmRisco}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-label">Frequência Média</p>
            <p className="stat-value">{stats.frequenciaMedia}%</p>
          </div>
        </div>
      </div>

      {/* Gráficos de desempenho */}
      <div className="charts-container">
        <div className="chart-box">
          <h2>Média de Notas por Aluno</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosMediasPorAluno}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="media" fill="#D4A017" name="Média" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Distribuição de Alunos por Turma</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosTurmas}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dadosTurmas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CORES_TURMAS[index % CORES_TURMAS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
