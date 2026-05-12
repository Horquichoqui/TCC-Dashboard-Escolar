// ============================================================
// DASHBOARD - Dashboard.jsx
// ============================================================
// Página principal após o login.
// Busca indicadores e gráficos na API e exibe os cards e charts do sistema.
// ============================================================

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar,
} from "recharts";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import StatCard from "../components/StatCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Loading from "../components/Loading.jsx";
import api from "../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faTriangleExclamation,
  faPenToSquare,
  faCalendarCheck,
  faSchool,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

const CORES_SITUACAO = {
  Regular:   "#22c55e",
  "Atenção": "#eab308",
  Risco:     "#ef4444",
};

const TooltipPersonalizado = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-xs text-white shadow-xl">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [resumo,        setResumo]        = useState(null);
  const [riscoPorTurma, setRiscoPorTurma] = useState([]);
  const [evolucao,      setEvolucao]      = useState([]);
  const [freqPorTurma,  setFreqPorTurma]  = useState([]);
  const [distribuicao,  setDistribuicao]  = useState([]);
  const [turmas,        setTurmas]        = useState([]);
  const [filtros,       setFiltros]       = useState({ turma_id: "" });
  const [carregando,    setCarregando]    = useState(true);

  useEffect(() => {
    api.get("/turmas").then((r) => setTurmas(r.data)).catch(() => {});
  }, []);

  useEffect(() => { carregarDados(); }, [filtros]);

  async function carregarDados() {
    setCarregando(true);
    try {
      const params = filtros.turma_id ? { turma_id: filtros.turma_id } : {};
      const [r1, r2, r3, r4, r5] = await Promise.all([
        api.get("/dashboard/resumo",               { params }),
        api.get("/dashboard/risco-por-turma"),
        api.get("/dashboard/evolucao-desempenho"),
        api.get("/dashboard/frequencia-por-turma"),
        api.get("/dashboard/distribuicao-situacao"),
      ]);
      setResumo(r1.data);
      setRiscoPorTurma(r2.data);
      setEvolucao(r3.data);
      setFreqPorTurma(r4.data);
      setDistribuicao(Object.entries(r5.data).map(([nome, valor]) => ({ nome, valor })));
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) return (
    <div className="flex min-h-screen dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1"><Header titulo="Dashboard" /><Loading /></div>
    </div>
  );

  const totalEmRisco = riscoPorTurma.reduce((acc, t) => acc + parseInt(t.em_risco || 0), 0);
  const percentualAbaixoMedia = resumo?.total_alunos > 0
    ? ((totalEmRisco / resumo.total_alunos) * 100).toFixed(1)
    : 0;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Dashboard" />
        <main className="flex-1 p-6 space-y-6">
          <FilterBar filtros={filtros} onChange={setFiltros} opcoesTurmas={turmas} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard titulo="Total de Alunos"  valor={resumo?.total_alunos}                                            icone={<FontAwesomeIcon icon={faUserGraduate} />}        cor="blue"   />
            <StatCard titulo="Alunos em Risco"  valor={totalEmRisco}                                                    icone={<FontAwesomeIcon icon={faTriangleExclamation} />}  cor="red"    />
            <StatCard titulo="Média Geral"      valor={resumo?.media_geral}                                             icone={<FontAwesomeIcon icon={faPenToSquare} />}          cor="yellow" />
            <StatCard titulo="Frequência Média" valor={resumo?.frequencia_media ? `${resumo.frequencia_media}%` : "-"} icone={<FontAwesomeIcon icon={faCalendarCheck} />}        cor="green"  />
            <StatCard titulo="Turmas"           valor={resumo?.total_turmas}                                            icone={<FontAwesomeIcon icon={faSchool} />}               cor="blue"   />
            <StatCard titulo="Abaixo da Média"  valor={`${percentualAbaixoMedia}%`}                                     icone={<FontAwesomeIcon icon={faArrowTrendDown} />}       cor="red"    />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard titulo="Alunos em Risco por Turma" altura="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riscoPorTurma} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="turma" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip content={<TooltipPersonalizado />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="total_alunos" name="Total de Alunos" fill="#facc15" radius={[4,4,0,0]} />
                  <Bar dataKey="em_risco"     name="Em Risco"        fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard titulo="Evolução da Média por Período" altura="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucao} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="periodo" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip content={<TooltipPersonalizado />} />
                  <Line
                    type="monotone" dataKey="media" name="Média Geral"
                    stroke="#facc15" strokeWidth={2.5}
                    dot={{ r: 5, fill: "#facc15", strokeWidth: 2, stroke: "#ca8a04" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard titulo="Distribuição por Situação" altura="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribuicao}
                    dataKey="valor"
                    nameKey="nome"
                    cx="50%" cy="45%"
                    outerRadius={95}
                    innerRadius={45}
                    paddingAngle={3}
                    label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {distribuicao.map((entrada, i) => (
                      <Cell key={i} fill={CORES_SITUACAO[entrada.nome] || "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip content={<TooltipPersonalizado />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard titulo="Frequência Média por Turma" altura="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={freqPorTurma} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="turma" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <Tooltip content={<TooltipPersonalizado />} formatter={(v) => `${v}%`} />
                  <Bar dataKey="frequencia_media" name="Frequência" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
}
