// ============================================================
// CABEÇALHO DAS TELAS — Header.jsx
// ============================================================
// Barra superior exibida em todas as telas do sistema.
// Mostra o título da página e o nome do usuário logado.
// ============================================================

import React from "react";

export default function Header({ titulo }) {
  // Lê os dados do usuário salvo no localStorage após o login
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>
      <div className="text-sm text-gray-500">
        {usuario.nome || "Coordenação"}
      </div>
    </header>
  );
}
