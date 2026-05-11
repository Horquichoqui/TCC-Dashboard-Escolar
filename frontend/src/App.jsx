// ============================================================
// COMPONENTE RAIZ — App.jsx
// ============================================================
// Define todas as rotas do sistema usando React Router DOM.
// Rotas protegidas só são acessadas por usuários com token JWT.
// ============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AlunosRisco from "./pages/AlunosRisco.jsx";
import Turmas from "./pages/Turmas.jsx";
import DetalheAluno from "./pages/DetalheAluno.jsx";
import IntegracaoSponte from "./pages/IntegracaoSponte.jsx";

// Componente que protege rotas privadas:
// se o usuário não estiver logado, redireciona para /login
function RotaProtegida({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública: tela de login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas: só acessíveis após login */}
        <Route path="/dashboard"          element={<RotaProtegida><Dashboard /></RotaProtegida>} />
        <Route path="/alunos-risco"       element={<RotaProtegida><AlunosRisco /></RotaProtegida>} />
        <Route path="/turmas"             element={<RotaProtegida><Turmas /></RotaProtegida>} />
        <Route path="/alunos/:id"         element={<RotaProtegida><DetalheAluno /></RotaProtegida>} />
        <Route path="/integracao-sponte"  element={<RotaProtegida><IntegracaoSponte /></RotaProtegida>} />

        {/* Qualquer outra rota redireciona para o dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
