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

  useEffect(() => {
    api.get("/turmas")
      .then((r) => setTurmas(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Turmas" />
        <main className="flex-1 p-6">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700">
            {carregando ? <Loading /> : turmas.length === 0 ? <EmptyState /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Turma</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Ano Letivo</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Turno</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Alunos</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Média</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Frequência</th>
                      <th className="px-4 py-3 font-semibold text-gray-600 dark:text-zinc-300">Em Risco</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turmas.map((turma) => (
                      <tr
                        key={turma.id}
                        onClick={() => navegar(`/alunos-risco?turma_id=${turma.id}`)}
                        className="border-b border-gray-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        <td className="px-4 py-3 font-medium text-yellow-500 dark:text-yellow-400">{turma.nome}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{turma.ano_letivo}</td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{turma.turno || "-"}</td>
                        <td className="px-4 py-3 dark:text-white">{turma.total_alunos}</td>
                        <td className="px-4 py-3 font-semibold dark:text-white">
                          {turma.media_turma ? Number(turma.media_turma).toFixed(1) : "-"}
                        </td>
                        <td className="px-4 py-3 dark:text-gray-300">
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
