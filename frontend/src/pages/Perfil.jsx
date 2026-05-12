// ============================================================
// PERFIL - Perfil.jsx
// ============================================================
// Tela para exibir os dados do usuário logado e seu perfil de acesso.
// Consome /auth/me para obter informações atualizadas do backend.
// ============================================================

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";
import api from "../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Perfil() {
  const [usuario,    setUsuario]    = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then((r) => setUsuario(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Meu Perfil" />
        <main className="flex-1 p-6 space-y-6">

          {carregando ? <Loading /> : !usuario ? (
            <p className="text-gray-500 dark:text-zinc-400">Não foi possível carregar os dados do perfil.</p>
          ) : (
            <>
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-4xl select-none">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{usuario.nome}</h2>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm mt-1">{usuario.email}</p>
                  <span className="inline-block mt-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {usuario.perfil}
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Dados da Conta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="bg-gray-50 dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Nome completo</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{usuario.nome}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">E-mail</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{usuario.email}</p>
                  </div>

                  <div className="bg-gray-50 dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Perfil de acesso</p>
                    <p className="font-semibold text-gray-800 dark:text-white capitalize">{usuario.perfil}</p>
                  </div>

                  {usuario.criado_em && (
                    <div className="bg-gray-50 dark:bg-zinc-700 border border-gray-100 dark:border-zinc-600 rounded-lg p-4">
                      <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Membro desde</p>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {new Date(usuario.criado_em).toLocaleDateString("pt-BR", {
                          day: "2-digit", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Permissões</h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-300">
                  <p>
                    Seu perfil é <strong className="capitalize">{usuario.perfil}</strong>.
                    {usuario.perfil === "coordenador" && (
                      " Como coordenador, você tem acesso completo ao dashboard pedagógico, podendo visualizar turmas, alunos em risco e indicadores de desempenho."
                    )}
                    {usuario.perfil === "professor" && (
                      " Como professor, você pode acompanhar o desempenho e a frequência dos alunos das turmas vinculadas."
                    )}
                    {usuario.perfil === "admin" && (
                      " Como administrador, você tem acesso total ao sistema, incluindo configurações e gerenciamento de usuários."
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  );
}
