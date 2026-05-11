// ============================================================
// CARD DE INDICADOR — StatCard.jsx
// ============================================================
// Exibe um número de destaque com título e ícone colorido.
// Usado nos cards do dashboard: total de alunos, média geral, etc.
// ============================================================

import React from "react";

  // Paleta de cores para o fundo do ícone
export default function StatCard({ titulo, valor, icone, cor = "yellow" }) {
  const cores = {
    yellow: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    green:  "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    red:    "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    blue:   "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium">{titulo}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{valor ?? "-"}</p>
        </div>
        {icone && (
          <div className={`text-3xl p-3 rounded-lg ${cores[cor]}`}>{icone}</div>
        )}
      </div>
    </div>
  );
}
