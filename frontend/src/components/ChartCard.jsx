// ============================================================
// CARD DE GRÁFICO — ChartCard.jsx
// ============================================================
// Embrulha um gráfico Recharts com título e bordas padronizadas.
// Todos os gráficos do dashboard usam este componente.
// ============================================================

import React from "react";

export default function ChartCard({ titulo, children, altura = "h-64" }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-6">
      <h3 className="text-base font-semibold text-gray-700 dark:text-yellow-400 mb-4">{titulo}</h3>
      <div className={altura}>{children}</div>
    </div>
  );
}
