import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import api from '../services/api';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAlunos: 0,
    alunosEmRisco: 0,
    frequenciaMedia: 0,
  });

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

  const calcularEstatisticas = (alunos, notas) => {
    const totalAlunos = alunos.length;

    const mediasPorAluno = {};
    notas.forEach((nota) => {
      if (!mediasPorAluno[nota.aluno_id]) {
        mediasPorAluno[nota.aluno_id] = [];
      }
      mediasPorAluno[nota.aluno_id].push(nota.valor_nota);
    });

    let alunosEmRisco = 0;
    Object.values(mediasPorAluno).forEach((notas) => {
      const media = notas.reduce((a, b) => a + b, 0) / notas.length;
      if (media < 6) alunosEmRisco++;
    });

    setStats({
      totalAlunos,
      alunosEmRisco,
      frequenciaMedia: 85,
    });
  };

  const dadosMediasPorAluno = alunos.slice(0, 5).map((aluno) => {
    const notasAluno = notas.filter((n) => n.aluno_id === aluno.id);
    const media =
      notasAluno.length > 0
        ? (notasAluno.reduce((a, b) => a + b.valor_nota, 0) / notasAluno.length).toFixed(1)
        : 0;
    return {
      nome: aluno.nome,
      media: parseFloat(media),
    };
  });

  const dadosDistribuicaoTurmas = {};
  alunos.forEach((aluno) => {
    if (!dadosDistribuicaoTurmas[aluno.turma]) {
      dadosDistribuicaoTurmas[aluno.turma] = 0;
    }
    dadosDistribuicaoTurmas[aluno.turma]++;
  });

  const dadosTurmas = Object.entries(dadosDistribuicaoTurmas).map(([turma, count]) => ({
    name: turma,
    value: count,
  }));

  const cores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

  if (loading) {
    return <div className="dashboard-loading">Carregando dados...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard de Monitoramento de Alunos</h1>

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

      <div className="charts-container">
        <div className="chart-box">
          <h2>Média de Notas por Aluno</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosMediasPorAluno}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="media" fill="#3498db" />
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
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
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
