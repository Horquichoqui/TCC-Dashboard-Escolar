// ============================================================
// BADGE DE SITUAÇÃO — RiskBadge.jsx
// ============================================================
// Exibe um rótulo colorido com a situação pedagógica do aluno:
// Verde = Regular | Amarelo = Atenção | Vermelho = Risco
// ============================================================

import React from "react";

export default function RiskBadge({ situacao }) {
  const estilos = {
    Regular:   "bg-green-100 text-green-800 border border-green-200",
    "Atenção": "bg-yellow-100 text-yellow-800 border border-yellow-200",
    Risco:     "bg-red-100 text-red-800 border border-red-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${estilos[situacao] || "bg-gray-100 text-gray-600"}`}>
      {situacao}
    </span>
  );
}
