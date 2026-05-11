// ============================================================
// TELA DO DASHBOARD — Dashboard.jsx
// ============================================================
// Tela principal do sistema. Exibe cards com os indicadores
// pedagógicos e 4 gráficos de desempenho e frequência.
//
// O Axios busca os dados do backend, que consulta o banco Neon.
// O Recharts transforma esses dados em gráficos visuais.
// ============================================================

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatCard from "../components/StatCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Loading from "../components/Loading.jsx";
import api from "../services/api.js";

// Cores usadas no gráfico de pizza (distribuição por situação)
const CORES_SITUACAO = {
  Regular:   "#22c55e",
  "Atenção": "#eab308",
  Risco:     "#ef4444",
};

export default function Dashboard() {
  // Estados que guardam os dados vindos do backend
  const [resumo,          setResumo]          = useState(null);
  const [riscoPorTurma,   setRiscoPorTurma]   = useState([]);
  const [evolucao,        setEvolucao]        = useState([]);
  const [freqPorTurma,    setFreqPorTurma]    = useState([]);
  const [distribuicao,    setDistribuicao]    = useState([]);
  const [turmas,          setTurmas]          = useState([]);
  const [filtros,         setFiltros]         = useState({ turma_id: "" });
  const [carregando,      setCarregando]      = useState(true);

  // Carrega a lista de turmas para o filtro (só uma vez)
  useEffect(() => {
    api.get("/turmas").then((r) => setTurmas(r.data)).catch(() => {});
  }, []);

  // Recarrega os dados do dashboard sempre que o filtro mudar
  useEffect(() => {
    carregarDados();
  }, [filtros]);

  async function carregarDados() {
    setCarregando(true);
    try {
      const parametros = filtros.turma_id ? { turma_id: filtros.turma_id } : {};

      // Busca todos os dados em paralelo para agilizar o carregamento
      const [r1, r2, r3, r4, r5] = await Promise.all([
        api.get("/dashboard/resumo",               { params: parametros }),
        api.get("/dashboard/risco-por-turma"),
        api.get("/dashboard/evolucao-desempenho"),
        api.get("/dashboard/frequencia-por-turma"),
        api.get("/dashboard/distribuicao-situacao"),
      ]);

      setResumo(r1.data);
      setRiscoPorTurma(r2.data);
      setEvolucao(r3.data);
      setFreqPorTurma(r4.data);

      // Transforma o objeto { Regular: 8, Atenção: 4, Risco: 3 } em array para o gráfico
      setDistribuicao(Object.entries(r5.data).map(([nome, valor]) => ({ nome, valor })));
    } catch (erro) {
      console.error("Erro ao carregar dashboard:", erro.message);
    } finally {
      setCarregando(false);
    }
  }

  // Exibe carregamento enquanto os dados chegam
  if (carregando) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1"><Header titulo="Dashboard" /><Loading /></div>
    </div>
  );

  // Calcula total de alunos em risco somando todas as turmas
  const totalEmRisco = riscoPorTurma.reduce((acc, t) => acc + parseInt(t.em_risco || 0), 0);
  const percentualAbaixoMedia = resumo?.total_alunos > 0
    ? ((totalEmRisco / resumo.total_alunos) * 100).toFixed(1)
    : 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Dashboard" />
        <main className="flex-1 p-6 space-y-6">

          {/* Filtros de turma */}
          <FilterBar filtros={filtros} onChange={setFiltros} opcoesTurmas={turmas} />

          {/* Cards de indicadores pedagógicos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard titulo="Total de Alunos"      valor={resumo?.total_alunos}                                                      icone="👨‍🎓" cor="blue"   />
            <StatCard titulo="Alunos em Risco"      valor={totalEmRisco}                                                              icone="⚠️"  cor="red"    />
            <StatCard titulo="Média Geral"          valor={resumo?.media_geral}                                                       icone="📝"  cor="blue"   />
            <StatCard titulo="Frequência Média"     valor={resumo?.frequencia_media ? `${resumo.frequencia_media}%` : "-"}            icone="📅"  cor="green"  />
            <StatCard titulo="Turmas"               valor={resumo?.total_turmas}                                                      icone="🏫"  cor="blue"   />
            <StatCard titulo="Abaixo da Média"      valor={`${percentualAbaixoMedia}%`}                                               icone="📉"  cor="yellow" />
          </div>

          {/* Gráficos pedagógicos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Gráfico 1: Alunos em risco por turma */}
            <ChartCard titulo="Alunos em Risco por Turma">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riscoPorTurma}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="turma" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_alunos" name="Total de Alunos" fill="#93c5fd" />
                  <Bar dataKey="em_risco"     name="Em Risco"        fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Gráfico 2: Evolução da média por período */}
            <ChartCard titulo="Evolução da Média por Período">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucao}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="media" name="Média" stroke="#2563eb" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Gráfico 3: Distribuição por situação (pizza) */}
            <ChartCard titulo="Distribuição por Situação">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicao}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%" cy="50%"
                    outerRadius={90}
                    label={({ nome, valor }) => `${nome}: ${valor}`}
                  >
                    {distribuicao.map((entrada, i) => (
                      <Cell key={i} fill={CORES_SITUACAO[entrada.nome] || "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Gráfico 4: Frequência média por turma */}
            <ChartCard titulo="Frequência Média por Turma">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={freqPorTurma}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="turma" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} unit="%" />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="frequencia_media" name="Frequência" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>
        </main>
      </div>
    </div>
  );
}
