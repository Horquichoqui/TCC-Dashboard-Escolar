// ============================================================
// TELA DE LOGIN — Login.jsx
// ============================================================
// Primeira tela do sistema. O usuário informa e-mail e senha.
// O backend valida as credenciais e retorna um token JWT.
// O token é salvo no navegador e usado nas próximas telas.
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

export default function Login() {
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState({
    email: "coordenacao@coopen.com",
    senha: "123456",
  });
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(evento) {
    evento.preventDefault();
    setMensagemErro("");
    setCarregando(true);
    try {
      // Envia as credenciais para o backend
      const { data } = await api.post("/auth/login", formulario);

      // Salva o token e os dados do usuário no navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navegar("/dashboard"); // Redireciona para o dashboard após login
    } catch (erro) {
      setMensagemErro(erro.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Cabeçalho da tela de login */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📊</div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Pedagógico
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Escola Cooperativa Coopen
          </p>
        </div>

        {/* Formulário de login */}
        <form onSubmit={aoEnviar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={formulario.senha}
              onChange={(e) =>
                setFormulario({ ...formulario, senha: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {mensagemErro && (
            <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {mensagemErro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          TCC/Projeto Integrador - UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
        </p>
      </div>
    </div>
  );
}
