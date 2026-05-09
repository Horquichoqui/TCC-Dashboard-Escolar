import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/AlunosEmRiscoPage.css';

// Página que lista os alunos com nota abaixo de 5 ou presença abaixo de 75%
export default function AlunosEmRiscoPage() {
  const [alunos, setAlunos] = useState([]);
  const [bimestre, setBimestre] = useState(1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarAlunos();
  }, [bimestre, ano, filtro]);

  const carregarAlunos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/relatorio/alunos-em-risco', {
        params: { bimestre, ano }
      });

      let alunosFiltrados = res.data.alunos_em_risco || [];

      // Aplica filtro adicional por tipo de risco se o usuário selecionou um
      if (filtro === 'nota') {
        alunosFiltrados = alunosFiltrados.filter(a => a.em_risco_nota);
      } else if (filtro === 'falta') {
        alunosFiltrados = alunosFiltrados.filter(a => a.em_risco_falta);
      }

      setAlunos(alunosFiltrados);
    } catch (error) {
      console.error('Erro ao carregar alunos em risco:', error);
    } finally {
      setLoading(false);
    }
  };

  // Define a classe CSS da linha da tabela conforme o tipo de risco
  const getRiscoBg = (aluno) => {
    if (aluno.em_risco_nota && aluno.em_risco_falta) {
      return 'critico';
    } else if (aluno.em_risco_nota) {
      return 'nota-baixa';
    } else {
      return 'falta-alta';
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="risco-container">
      <div className="header-risco">
        <h1>⚠️ Alunos em Risco</h1>
        <p>Monitore alunos com notas baixas (&lt; 5.0) ou muitas faltas (&lt; 75% de presença)</p>
      </div>

      <div className="controles">
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

        <div className="filtro-group">
          <label>Tipo de Risco:</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos ({alunos.length})</option>
            <option value="nota">Notas Baixas</option>
            <option value="falta">Muitas Faltas</option>
          </select>
        </div>
      </div>

      {alunos.length === 0 ? (
        <div className="vazio">
          <h3>✓ Nenhum aluno em risco!</h3>
          <p>Todos os alunos estão com bom desempenho e frequência adequada.</p>
        </div>
      ) : (
        <div className="tabela-container">
          <table className="tabela-risco">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Matricula</th>
                <th>Turma</th>
                <th>Média</th>
                <th>Presença</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className={`risco-${getRiscoBg(aluno)}`}>
                  <td className="nome">
                    <span className="risco-icon">
                      {aluno.em_risco_nota && aluno.em_risco_falta && '🔴'}
                      {aluno.em_risco_nota && !aluno.em_risco_falta && '📚'}
                      {!aluno.em_risco_nota && aluno.em_risco_falta && '📅'}
                    </span>
                    {aluno.nome}
                  </td>
                  <td>{aluno.matricula}</td>
                  <td>{aluno.turma}</td>
                  <td className={`valor ${aluno.em_risco_nota ? 'alerta' : ''}`}>
                    {aluno.media_notas.toFixed(2)}
                  </td>
                  <td className={`valor ${aluno.em_risco_falta ? 'alerta' : ''}`}>
                    {aluno.percentual_presenca}%
                  </td>
                  <td>
                    <div className="motivo">
                      {aluno.em_risco_nota && (
                        <span className="tag nota">Nota Baixa</span>
                      )}
                      {aluno.em_risco_falta && (
                        <span className="tag falta">Muitas Faltas</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="resumo">
        <div className="card-resumo">
          <h4>Total em Risco</h4>
          <p className="numero">{alunos.length}</p>
        </div>
        <div className="card-resumo">
          <h4>Por Notas</h4>
          <p className="numero">
            {alunos.filter(a => a.em_risco_nota).length}
          </p>
        </div>
        <div className="card-resumo">
          <h4>Por Faltas</h4>
          <p className="numero">
            {alunos.filter(a => a.em_risco_falta).length}
          </p>
        </div>
        <div className="card-resumo critico">
          <h4>Crítico</h4>
          <p className="numero">
            {alunos.filter(a => a.em_risco_nota && a.em_risco_falta).length}
          </p>
        </div>
      </div>
    </div>
  );
}
