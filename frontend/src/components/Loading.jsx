// ============================================================
// INDICADOR DE CARREGAMENTO — Loading.jsx
// ============================================================
// Exibido enquanto os dados estão sendo carregados do backend.
// ============================================================

import React from "react";

export default function Loading({ mensagem = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
      <p className="text-sm">{mensagem}</p>
    </div>
  );
}
