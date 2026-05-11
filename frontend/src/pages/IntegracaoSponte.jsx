// ============================================================
// TELA DE INTEGRAÇÃO SPONTE — IntegracaoSponte.jsx
// ============================================================
// Exibe o status da integração com o sistema Sponte.
// Atualmente os dados vêm do banco Neon.
// A integração real com a API Sponte está prevista para versão futura.
// ============================================================

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Loading from "../components/Loading.jsx";
import api from "../services/api.js";

export default function IntegracaoSponte() {
  const [statusIntegracao, setStatusIntegracao] = useState(null);
  const [carregando,       setCarregando]       = useState(true);

  // Busca o status da integração ao carregar a tela
  useEffect(() => {
    api.get("/integracao-sponte/status")
      .then((r) => setStatusIntegracao(r.data))
      .catch(console.error)
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Integração Sponte" />
        <main className="flex-1 p-6 space-y-6">

          {carregando ? <Loading /> : (
            <>
              {/* Painel de status: origem atual e integração futura */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Status da Integração</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <p className="text-xs text-green-600 font-medium mb-1">Origem dos Dados</p>
                    <p className="font-bold text-green-800">{statusIntegracao?.origem || "Neon/PostgreSQL"}</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">Integração Futura</p>
                    <p className="font-bold text-blue-800">{statusIntegracao?.integracao_futura || "API Sponte"}</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Status</p>
                    <p className="font-bold text-gray-700">{statusIntegracao?.registro?.status || "Pendente"}</p>
                  </div>
                </div>
              </div>

              {/* Explicação sobre o Sponte e a arquitetura do sistema */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Sobre o Sponte</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  O <strong>Sponte</strong> é o sistema de gestão acadêmica utilizado pela Escola
                  Cooperativa Coopen. Neste dashboard, os dados pedagógicos estão carregados
                  diretamente no banco <strong>PostgreSQL (Neon)</strong>, permitindo demonstração
                  e análise dos indicadores educacionais.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">
                  A integração com a API do Sponte está prevista para uma versão futura do sistema,
                  quando os dados serão sincronizados automaticamente — eliminando a necessidade
                  de importação manual de planilhas.
                </p>
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  <strong>📌 Nota para o TCC:</strong> O sistema já possui a estrutura preparada
                  para receber a integração futura com a API Sponte, seguindo a arquitetura
                  definida neste projeto.
                </div>
              </div>

              {/* Botão desabilitado — integração ainda não implementada */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Sincronização</h3>
                <p className="text-gray-500 text-sm mb-4">
                  A sincronização automática com o Sponte estará disponível quando a integração
                  for implementada.
                </p>
                <button
                  disabled
                  className="bg-gray-100 text-gray-400 cursor-not-allowed px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-200"
                >
                  🔄 Sincronizar com Sponte (em breve)
                </button>
              </div>

              {/* Último registro de integração salvo no banco */}
              {statusIntegracao?.registro && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-gray-700 mb-2">Último Registro</h3>
                  <p className="text-sm text-gray-500">{statusIntegracao.registro.mensagem}</p>
                  {statusIntegracao.registro.criado_em && (
                    <p className="text-xs text-gray-400 mt-1">
                      Registrado em:{" "}
                      {new Date(statusIntegracao.registro.criado_em).toLocaleString("pt-BR")}
                    </p>
                  )}
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
}
