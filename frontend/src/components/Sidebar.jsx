// ============================================================
// MENU LATERAL �?? Sidebar.jsx
// ============================================================
// Exibido em todas as telas protegidas do sistema.
// Contém os links de navegação e o botão de sair.
// ============================================================

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faTriangleExclamation,
  faSchool,
  faLink,
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// Itens do menu lateral com ícone, rótulo e rota
const itensMenu = [
  { para: "/dashboard",         rotulo: "Dashboard",          icone: faChartLine },
  { para: "/alunos-risco",      rotulo: "Alunos em Risco",    icone: faTriangleExclamation },
  { para: "/turmas",            rotulo: "Turmas",             icone: faSchool },
  { para: "/integracao-sponte", rotulo: "Integração Sponte",  icone: faLink },
  { para: "/perfil",            rotulo: "Meu Perfil",         icone: faUser },
  { para: "/configuracoes",     rotulo: "Configurações",      icone: faGear },
];

export default function Sidebar() {
  const navegar = useNavigate();

  // Remove o token e redireciona para o login ao clicar em "Sair"
  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navegar("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 text-yellow-400 flex flex-col">
      <div className="p-6 border-b border-zinc-700">
        <h1 className="text-lg font-bold leading-tight text-yellow-400">Dashboard Pedagógico</h1>
        <p className="text-zinc-400 text-sm mt-1">Coopen</p>
      </div>

      {/* Links de navegação */}
      <nav className="flex-1 p-4 space-y-1">
        {itensMenu.map((item) => (
          <NavLink
            key={item.para}
            to={item.para}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-yellow-400 text-zinc-900"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-yellow-300"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icone} fixedWidth />
            {item.rotulo}
          </NavLink>
        ))}
      </nav>
      {/* Botão de sair */}
      <div className="p-4 border-t border-zinc-700">
        <button
          onClick={sair}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-yellow-300 transition-colors"
        >
          <FontAwesomeIcon icon={faRightFromBracket} fixedWidth /> Sair
        </button>
      </div>
    </aside>
  );
}
