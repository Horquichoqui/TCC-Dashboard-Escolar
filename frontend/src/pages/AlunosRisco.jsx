// ============================================================
// TELA DE ALUNOS EM RISCO - AlunosRisco.jsx
// ============================================================
// Lista os alunos em situação de Risco ou Atenção.
// Permite filtrar por turma e situação, e exportar o resultado em CSV.
// ============================================================
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import FilterBar from "../components/FilterBar.jsx";
import RiskBadge from "../components/RiskBadge.jsx";
import Loading from "../components/Loading.jsx";
import EmptyState from "../components/EmptyState.jsx";
import api from "../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function AlunosRisco() {
  const navegar = useNavigate();
  const [alunos,     setAlunos]     = useState([]);
  const [turmas,     setTurmas]     = useState([]);
  const [filtros,    setFiltros]    = useState({ turma_id: "", situacao: "" });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get("/turmas").then((r) => setTurmas(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    carregarAlunos();
  }, [filtros]);

  async function carregarAlunos() {
    setCarregando(true);
    try {
      const parametros = {};
      if (filtros.turma_id) parametros.turma_id = filtros.turma_id;

      const { data } = await api.get("/alunos/risco", { params: parametros });
      setAlunos(filtros.situacao ? data.filter((a) => a.situacao === filtros.situacao) : data);
    } catch (erro) {
      console.error(erro);
    } finally {
      setCarregando(false);
    }
  }

  function exportarCSV() {
    const parametros = new URLSearchParams();
    if (filtros.turma_id) parametros.set("turma_id", filtros.turma_id);
    const token = localStorage.getItem("token");
    const urlExportacao = `${import.meta.env.VITE_API_URL || "/api"}/relatorios/alunos-risco/exportar?${parametros}`;

    fetch(urlExportacao, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((arquivo) => {
        const linkTemporario = document.createElement("a");
        linkTemporario.href = URL.createObjectURL(arquivo);
        linkTemporario.download = "alunos_em_risco.csv";
        linkTemporario.click();
      });
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Alunos em Risco" />
        <main className="flex-1 p-6 space-y-4">

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <FilterBar filtros={filtros} onChange={setFiltros} opcoesTurmas={turmas} />
            <button
              onClick={exportarCSV}
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon icon={faFileArrowDown} />
                Exportar CSV
              </span>
            </button>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-700">
              <p className="text-sm text-gray-500 dark:text-zinc-400">{alunos.length} alunos encontrados</p>
            </div>

            {carregando ? (
              <Loading />
            ) : alunos.length === 0 ? (
              <EmptyState mensagem="Nenhum aluno em risco encontrado com os filtros selecionados." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Nome</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Matrícula</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Turma</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Média</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Frequência</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Situação</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Motivo</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => (
                      <tr key={aluno.id} className="border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700">
                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{aluno.nome}</td>
                        <td className="px-4 py-3 text-gray-500 dark:text-zinc-400">{aluno.matricula}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{aluno.turma}</td>
                        <td className="px-4 py-3 font-semibold dark:text-white">{Number(aluno.media_geral).toFixed(1)}</td>
                        <td className="px-4 py-3 dark:text-gray-300">{Number(aluno.frequencia_media).toFixed(1)}%</td>
                        <td className="px-4 py-3"><RiskBadge situacao={aluno.situacao} /></td>
                        <td className="px-4 py-3 text-gray-500 dark:text-zinc-400 text-xs">{aluno.motivo}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navegar(`/alunos/${aluno.id}`)}
                            className="text-yellow-500 dark:text-yellow-400 hover:underline text-xs font-medium"
                          >
                            Ver detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
