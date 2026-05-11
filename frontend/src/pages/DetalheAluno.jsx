// ============================================================
// TELA DE DETALHE DO ALUNO — DetalheAluno.jsx
// ============================================================
// Exibe todas as informações de um aluno específico:
// situação, média, frequência, notas por disciplina e gráfico.
// ============================================================

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import RiskBadge from "../components/RiskBadge.jsx";
import StatCard from "../components/StatCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import Loading from "../components/Loading.jsx";
import api from "../services/api.js";

export default function DetalheAluno() {
  const { id } = useParams(); // Pega o ID do aluno da URL (/alunos/:id)
  const navegar = useNavigate();
  const [aluno,      setAluno]      = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Busca os dados do aluno pelo ID assim que a tela carrega
  useEffect(() => {
    api.get(`/alunos/${id}`)
      .then((r) => setAluno(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1"><Header titulo="Detalhe do Aluno" /><Loading /></div>
    </div>
  );

  if (!aluno) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 text-gray-500">Aluno não encontrado.</div>
    </div>
  );

  // Agrupa notas por disciplina e calcula a média de cada uma para o gráfico
  const notasPorDisciplina = (aluno.notas || []).reduce((acumulador, nota) => {
    const disciplina = acumulador.find((d) => d.disciplina === nota.disciplina);
    if (disciplina) {
      disciplina.total += parseFloat(nota.nota);
      disciplina.quantidade += 1;
    } else {
      acumulador.push({ disciplina: nota.disciplina, total: parseFloat(nota.nota), quantidade: 1 });
    }
    return acumulador;
  }, []).map((d) => ({
    disciplina: d.disciplina,
    media: parseFloat((d.total / d.quantidade).toFixed(2)),
  }));

  // Define a cor dos cards com base nos valores do aluno
  const corMedia = aluno.media_geral >= 7 ? "green" : aluno.media_geral >= 6 ? "yellow" : "red";
  const corFreq  = aluno.frequencia_media > 80 ? "green" : aluno.frequencia_media >= 75 ? "yellow" : "red";
  const corSit   = aluno.situacao === "Regular" ? "green" : aluno.situacao === "Atenção" ? "yellow" : "red";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Detalhe do Aluno" />
        <main className="flex-1 p-6 space-y-6">

          <button onClick={() => navegar(-1)} className="text-blue-600 hover:underline text-sm">
            ← Voltar
          </button>

          {/* Informações principais do aluno */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{aluno.nome}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Matrícula: {aluno.matricula} | Turma: {aluno.turma}
                </p>
                <p className="text-gray-400 text-sm mt-1">{aluno.motivo}</p>
              </div>
              <RiskBadge situacao={aluno.situacao} />
            </div>
          </div>

          {/* Cards com os indicadores do aluno */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard titulo="Média Geral"  valor={Number(aluno.media_geral).toFixed(1)}        icone="📝" cor={corMedia} />
            <StatCard titulo="Frequência"   valor={`${Number(aluno.frequencia_media).toFixed(1)}%`} icone="📅" cor={corFreq}  />
            <StatCard titulo="Turma"        valor={aluno.turma}                                  icone="🏫" cor="blue"   />
            <StatCard titulo="Situação"     valor={aluno.situacao}                               icone="🎯" cor={corSit}  />
          </div>

          {/* Gráfico de média por disciplina */}
          {notasPorDisciplina.length > 0 && (
            <ChartCard titulo="Média por Disciplina" altura="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={notasPorDisciplina}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="disciplina" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="media" name="Média" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* Tabela de frequência por disciplina */}
          {aluno.frequencias?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-700 mb-4">Frequência por Disciplina</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-left">
                      <th className="px-4 py-2 text-gray-600">Disciplina</th>
                      <th className="px-4 py-2 text-gray-600">Total de Aulas</th>
                      <th className="px-4 py-2 text-gray-600">Presenças</th>
                      <th className="px-4 py-2 text-gray-600">Frequência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aluno.frequencias.map((freq, i) => (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="px-4 py-2 font-medium">{freq.disciplina}</td>
                        <td className="px-4 py-2">{freq.total_aulas}</td>
                        <td className="px-4 py-2">{freq.total_presencas}</td>
                        <td className={`px-4 py-2 font-semibold ${
                          parseFloat(freq.percentual_frequencia) < 75 ? "text-red-600"
                          : parseFloat(freq.percentual_frequencia) <= 80 ? "text-yellow-600"
                          : "text-green-600"
                        }`}>
                          {Number(freq.percentual_frequencia).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
