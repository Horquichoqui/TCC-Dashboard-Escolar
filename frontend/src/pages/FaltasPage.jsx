import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import '../styles/FaltasPage.css';

export default function FaltasPage() {
  const { usuario } = useAuth();
  const [alunos, setAlunos] = useState([]);
  const [bimestre, setBimestre] = useState(1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [diasLetivos, setDiasLetivos] = useState([]);
  const [presencasAlunos, setPresencasAlunos] = useState({});
  const [loading, setLoading] = useState(true);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [novaFalta, setNovaFalta] = useState({ data: '', presente: true });

  useEffect(() => {
    carregarDados();
  }, [bimestre, ano]);

  const carregarDados = async () => {
    try {
      setLoading(true);

      const [alunosRes, diasRes, presencaRes] = await Promise.all([
        api.get('/alunos'),
        api.get('/dias-letivos', { params: { ano } }),
        api.get('/relatorio/alunos-em-risco', { params: { bimestre, ano } })
      ]);

      setAlunos(alunosRes.data.alunos || []);
      setDiasLetivos(diasRes.data.dias_letivos || []);

      if (presencaRes.data.alunos_em_risco) {
        const mapPresenca = {};
        presencaRes.data.alunos_em_risco.forEach(a => {
          mapPresenca[a.id] = a;
        });
        setPresencasAlunos(mapPresenca);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const diasBimestre = diasLetivos.find(d => d.bimestre == bimestre)?.dias || 50;

  const handleLançarFalta = async (alunoId) => {
    if (!novaFalta.data) {
      alert('Selecione uma data');
      return;
    }

    try {
      await api.post('/faltas', {
        aluno_id: alunoId,
        data: novaFalta.data,
        presente: novaFalta.presente,
        bimestre: bimestre
      });

      alert('Falta registrada com sucesso!');
      setNovaFalta({ data: '', presente: true });
      setAlunoSelecionado(null);
      carregarDados();
    } catch (error) {
      console.error('Erro ao lançar falta:', error);
      alert('Erro ao registrar falta');
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="faltas-container">
      <h1>📋 Lançamento de Faltas e Presença</h1>

      <div className="filtros">
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
          <label>Dias Letivos:</label>
          <div className="dias-config">
            <input
              type="number"
              value={diasBimestre}
              readOnly
              placeholder="Dias letivos do bimestre"
            />
          </div>
        </div>
      </div>

      <div className="alunos-grid">
        {alunos.map((aluno) => {
          const emRisco = presencasAlunos[aluno.id];

          return (
            <div
              key={aluno.id}
              className={`aluno-card ${emRisco ? 'em-risco' : ''}`}
            >
              <div className="aluno-header">
                <h3>{aluno.nome}</h3>
                {emRisco && (
                  <span className="badge-risco">⚠️ EM RISCO</span>
                )}
              </div>

              <div className="aluno-info">
                <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                <p><strong>Turma:</strong> {aluno.turma}</p>
              </div>

              {emRisco && (
                <div className="risco-info">
                  {emRisco.em_risco_nota && (
                    <div className="risco-item nota-baixa">
                      📚 Média: {emRisco.media_notas} (< 5.0)
                    </div>
                  )}
                  {emRisco.em_risco_falta && (
                    <div className="risco-item falta-alta">
                      📅 Presença: {emRisco.percentual_presenca}% (< 75%)
                    </div>
                  )}
                </div>
              )}

              <button
                className="btn-lancar-falta"
                onClick={() => setAlunoSelecionado(alunoSelecionado === aluno.id ? null : aluno.id)}
              >
                {alunoSelecionado === aluno.id ? '✕ Cancelar' : '✓ Lançar Falta'}
              </button>

              {alunoSelecionado === aluno.id && (
                <div className="form-falta">
                  <div className="form-group">
                    <label>Data:</label>
                    <input
                      type="date"
                      value={novaFalta.data}
                      onChange={(e) => setNovaFalta({...novaFalta, data: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Status:</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          checked={novaFalta.presente === true}
                          onChange={() => setNovaFalta({...novaFalta, presente: true})}
                        />
                        <span className="radio-label presente">✓ Presente</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          checked={novaFalta.presente === false}
                          onChange={() => setNovaFalta({...novaFalta, presente: false})}
                        />
                        <span className="radio-label falta">✕ Falta</span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn-confirmar"
                    onClick={() => handleLançarFalta(aluno.id)}
                  >
                    Confirmar Lançamento
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
