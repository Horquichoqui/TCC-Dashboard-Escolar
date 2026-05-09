import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import api from '../services/api';
import '../styles/RelatoriosPage.css';

export default function RelatoriosPage() {
  const [bimestre, setBimestre] = useState(1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [dadosTurma, setDadosTurma] = useState([]);
  const [dadosNotas, setDadosNotas] = useState([]);
  const [dadosPresenca, setDadosPresenca] = useState([]);
  const [dadosDistribuicao, setDadosDistribuicao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [bimestre, ano]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      const [alunosRes, notasRes, faltasRes] = await Promise.all([
        api.get('/alunos'),
        api.get('/notas'),
        api.get('/relatorio/alunos-em-risco', { params: { bimestre, ano } })
      ]);

      const alunos = alunosRes.data.alunos || [];
      const notas = notasRes.data.notas || [];
      const alunosRisco = faltasRes.data.alunos_em_risco || [];

      processarDados(alunos, notas, alunosRisco, bimestre);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const processarDados = (alunos, notas, alunosRisco, bimestre) => {
    const turmas = {};

    alunos.forEach(aluno => {
      if (!turmas[aluno.turma]) {
        turmas[aluno.turma] = {
          turma: aluno.turma,
          alunos: 0,
          mediaNotas: 0,
          presenca: 0,
          em_risco: 0,
          alunos_list: []
        };
      }
      turmas[aluno.turma].alunos += 1;
      turmas[aluno.turma].alunos_list.push(aluno.id);
    });

    notas.forEach(nota => {
      const aluno = alunos.find(a => a.id === nota.aluno_id);
      if (aluno && turmas[aluno.turma]) {
        turmas[aluno.turma].mediaNotas += nota.valor_nota;
      }
    });

    alunosRisco.forEach(aluno => {
      if (turmas[aluno.turma]) {
        turmas[aluno.turma].em_risco += 1;
        turmas[aluno.turma].presenca = (turmas[aluno.turma].presenca || 0) + aluno.percentual_presenca;
      }
    });

    const dadosProcessados = Object.values(turmas).map(turma => ({
      turma: turma.turma,
      alunos: turma.alunos,
      mediaNotas: turma.alunos > 0 ? (turma.mediaNotas / turma.alunos).toFixed(2) : 0,
      presenca: turma.em_risco > 0 ? (turma.presenca / turma.em_risco).toFixed(2) : 100,
      em_risco: turma.em_risco
    }));

    setDadosTurma(dadosProcessados);
    setDadosNotas(dadosProcessados);
    setDadosPresenca(dadosProcessados);

    const distribuicao = [
      { name: 'Normal', value: Math.max(0, alunos.length - alunosRisco.length), color: '#22c55e' },
      { name: 'Em Risco', value: alunosRisco.length, color: '#ef4444' }
    ];
    setDadosDistribuicao(distribuicao);
  };

  if (loading) {
    return <div className="loading">Carregando gráficos...</div>;
  }

  return (
    <div className="relatorios-container">
      <div className="header-relatorios">
        <h1>📊 Relatórios de Desempenho</h1>
        <p>Análise de desempenho, notas e faltas por turma</p>
      </div>

      <div className="filtros-relatorios">
        <div className="filtro-group">
          <label>Bimestre:</label>
          <select value={bimestre} onChange={(e) => setBimestre(parseInt(e.target.value))}>
            <option value={1}>1º Bimestre</option>
            <option value={2}>2º Bimestre</option>
            <option value={3}>3º Bimestre</option>
            <option value={4}>4º Bimestre</option>
          </select>
        </div>

        <div className="filtro-group">
          <label>Ano:</label>
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            min="2020"
            max={new Date().getFullYear() + 1}
          />
        </div>
      </div>

      <div className="graficos-grid">
        <div className="grafico-card">
          <h3>📚 Média de Notas por Turma</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosNotas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis domain={[0, 10]} label={{ value: 'Média', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => value.toFixed(2)} />
              <Legend />
              <Bar dataKey="mediaNotas" fill="#3b82f6" name="Média de Notas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-card">
          <h3>📋 Presença Média por Turma</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosPresenca}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="presenca" fill="#22c55e" name="% Presença" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-card">
          <h3>⚠️ Alunos em Risco por Turma</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosTurma}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis label={{ value: 'Quantidade', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="alunos" fill="#9ca3af" name="Total Alunos" />
              <Bar dataKey="em_risco" fill="#ef4444" name="Em Risco" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-card">
          <h3>👥 Distribuição de Alunos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosDistribuicao}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {dadosDistribuicao.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-card">
          <h3>📈 Comparativo: Notas x Presença</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosTurma}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="turma" />
              <YAxis yAxisId="left" label={{ value: 'Nota', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: '%', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="mediaNotas" stroke="#3b82f6" name="Média Notas" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="presenca" stroke="#22c55e" name="Presença %" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico-card tabela-resumo">
          <h3>📊 Resumo por Turma</h3>
          <div className="tabela-container">
            <table className="tabela-resumo-dados">
              <thead>
                <tr>
                  <th>Turma</th>
                  <th>Total</th>
                  <th>Média</th>
                  <th>Presença</th>
                  <th>Risco</th>
                  <th>% Risco</th>
                </tr>
              </thead>
              <tbody>
                {dadosTurma.map((turma, idx) => (
                  <tr key={idx}>
                    <td>{turma.turma}</td>
                    <td>{turma.alunos}</td>
                    <td className={parseFloat(turma.mediaNotas) < 5 ? 'alerta' : ''}>
                      {turma.mediaNotas}
                    </td>
                    <td className={parseFloat(turma.presenca) < 75 ? 'alerta' : ''}>
                      {turma.presenca}%
                    </td>
                    <td>{turma.em_risco}</td>
                    <td className={turma.em_risco > 0 ? 'alerta' : ''}>
                      {turma.alunos > 0 ? ((turma.em_risco / turma.alunos) * 100).toFixed(0) : 0}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="legenda-relatorios">
        <div className="legenda-item">
          <span className="legenda-cor" style={{ backgroundColor: '#3b82f6' }}></span>
          <p>Nota entre 5.0 e 10.0</p>
        </div>
        <div className="legenda-item">
          <span className="legenda-cor" style={{ backgroundColor: '#22c55e' }}></span>
          <p>Presença acima de 75%</p>
        </div>
        <div className="legenda-item">
          <span className="legenda-cor" style={{ backgroundColor: '#ef4444' }}></span>
          <p>Em risco (nota < 5 ou presença < 75%)</p>
        </div>
        <div className="legenda-item">
          <span className="legenda-cor" style={{ backgroundColor: '#fbbf24' }}></span>
          <p>Atenção necessária</p>
        </div>
      </div>
    </div>
  );
}
