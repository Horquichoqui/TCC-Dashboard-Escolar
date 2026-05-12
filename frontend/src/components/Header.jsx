// ============================================================
// CABEÇALHO DAS TELAS — Header.jsx
// ============================================================
// Barra superior exibida em todas as telas do sistema.
// Mostra o título da página e o nome do usuário logado.
// ============================================================

import React from "react";
import { useTema } from "../contexts/TemaContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Header({ titulo }) {
  // Lê os dados do usuário salvo no localStorage após o login
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const { modoEscuro, setModoEscuro } = useTema();

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-yellow-400">{titulo}</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setModoEscuro(!modoEscuro)}
          className="text-lg px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-700 hover:bg-yellow-100 dark:hover:bg-zinc-600 transition-colors"
          title={modoEscuro ? "Modo claro" : "Modo escuro"}
        >
          <FontAwesomeIcon icon={modoEscuro ? faSun : faMoon} />
        </button>
        <span className="text-sm text-gray-500 dark:text-zinc-400">
          {usuario.nome || "Coordenação"}
        </span>
      </div>
    </header>
  );
}
