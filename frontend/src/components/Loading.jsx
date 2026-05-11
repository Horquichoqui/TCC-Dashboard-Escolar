// ============================================================
// INDICADOR DE CARREGAMENTO — Loading.jsx
// ============================================================
// Exibido enquanto os dados estão sendo carregados do backend.
// ============================================================

import React from "react";

export default function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-zinc-500">
      <div className="w-8 h-8 border-4 border-yellow-200 border-t-yellow-500 rounded-full animate-spin mb-3"></div>
      <p className="text-sm">{mensagem}</p>
    </div>
  );
}
