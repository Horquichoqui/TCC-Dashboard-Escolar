import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { useTema } from "../contexts/TemaContext.jsx";

const integrantes = [
  { nome: "Vinícius Franco Ferreira",         ra: "RA: 23205519" },
  { nome: "Márcio José Valderrama",           ra: "RA: 23203273" },
  { nome: "Gabriel Pereira Job",              ra: "RA: 23221644" },
  { nome: "André Henrique Torres de Araújo",  ra: "RA: 23207674" },
  { nome: "Benício Rogério de Oliveira",      ra: "RA: 23223433" },
  { nome: "Filipe Cunha de Sousa",            ra: "RA: 23217763" },
  { nome: "Tatiane Rodrigues Tiburcio",       ra: "RA: 23203768" },
  { nome: "Mateus Vinicius dos Santos Souza", ra: "RA: 23218131" },
];

export default function Configuracoes() {
  const { modoEscuro, setModoEscuro, tamanhoFonte, setTamanhoFonte } = useTema();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header titulo="Configurações" />
        <main className="flex-1 p-6 space-y-6">

          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Aparência</h3>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-zinc-700">
              <div>
                <p className="font-medium text-gray-800 dark:text-white text-sm">Modo Escuro</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Alterna entre tema claro e escuro</p>
              </div>
              <button
                onClick={() => setModoEscuro(!modoEscuro)}
                className={`relative w-12 h-6 rounded-full transition-colors ${modoEscuro ? "bg-yellow-400" : "bg-gray-300"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${modoEscuro ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">Acessibilidade</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-4">Ajuste o tamanho do texto para melhor leitura</p>
            <div className="flex gap-3">
              {[
                { chave: "pequena", rotulo: "Pequeno", exemplo: "Aa" },
                { chave: "medio",   rotulo: "Médio",   exemplo: "Aa" },
                { chave: "grande",  rotulo: "Grande",  exemplo: "Aa" },
              ].map((op) => (
                <button
                  key={op.chave}
                  onClick={() => setTamanhoFonte(op.chave)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition-all ${
                    tamanhoFonte === op.chave
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-gray-200 dark:border-zinc-600 hover:border-yellow-300"
                  }`}
                >
                  <span className={`font-bold text-gray-800 dark:text-white ${
                    op.chave === "pequena" ? "text-sm" : op.chave === "medio" ? "text-base" : "text-xl"
                  }`}>{op.exemplo}</span>
                  <span className="text-xs text-gray-500 dark:text-zinc-400">{op.rotulo}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sobre o Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Nome do Projeto</p>
                <p className="font-semibold text-gray-800 dark:text-white">Dashboard Pedagógico Coopen</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Instituição</p>
                <p className="font-semibold text-gray-800 dark:text-white">UNIVESP</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Disciplina</p>
                <p className="font-semibold text-gray-800 dark:text-white">TCC / Projeto Integrador III</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mb-1">Tutora</p>
                <p className="font-semibold text-gray-800 dark:text-white">Julia Leite Lumini</p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-gray-700 dark:text-zinc-300 mb-3">Equipe de Desenvolvimento</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {integrantes.map((p, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-700 rounded-lg p-3">
                  <div className="w-9 h-9 rounded-full bg-yellow-400 text-zinc-900 flex items-center justify-center font-bold text-sm">
                    {p.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{p.nome}</p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400">{p.ra}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
