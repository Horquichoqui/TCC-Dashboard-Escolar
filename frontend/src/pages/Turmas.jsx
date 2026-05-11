// ============================================================
// TELA DE TURMAS — Turmas.jsx
// ============================================================
// Lista todas as turmas com seus indicadores pedagógicos.
// Ao clicar em uma turma, filtra os alunos em risco daquela turma.
// ============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";
import EmptyState from "../components/EmptyState.jsx";
import api from "../services/api.js";

export default function Turmas() {
  const navegar = useNavigate();
  const [turmas,     setTurmas]     = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca a lista de turmas ao carregar a tela
  useEffect(() => {
    api.get("/turmas")
      .then((r) => setTurmas(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Turmas" />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {carregando ? <Loading /> : turmas.length === 0 ? <EmptyState /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-600">Turma</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Ano Letivo</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Turno</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Alunos</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Média</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Frequência</th>
                      <th className="px-4 py-3 font-semibold text-gray-600">Em Risco</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turmas.map((turma) => (
                      <tr
                        key={turma.id}
                        onClick={() => navegar(`/alunos-risco?turma_id=${turma.id}`)}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-4 py-3 font-medium text-blue-700">{turma.nome}</td>
                        <td className="px-4 py-3 text-gray-600">{turma.ano_letivo}</td>
                        <td className="px-4 py-3 text-gray-600">{turma.turno || "-"}</td>
                        <td className="px-4 py-3">{turma.total_alunos}</td>
                        <td className="px-4 py-3 font-semibold">
                          {turma.media_turma ? Number(turma.media_turma).toFixed(1) : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {turma.frequencia_media ? `${Number(turma.frequencia_media).toFixed(1)}%` : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {parseInt(turma.alunos_em_risco) > 0 ? (
                            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                              {turma.alunos_em_risco} em risco
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                              Nenhum
                            </span>
                          )}
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
