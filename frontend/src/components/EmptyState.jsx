// ============================================================
// ESTADO VAZIO — EmptyState.jsx
// ============================================================
// Exibido quando uma consulta não retorna nenhum resultado.
// ============================================================

import React from "react";

export default function EmptyState({ mensagem = "Nenhum dado encontrado." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-zinc-500">
      <span className="text-5xl mb-3">📭</span>
      <p className="text-sm">{mensagem}</p>
    </div>
  );
}
