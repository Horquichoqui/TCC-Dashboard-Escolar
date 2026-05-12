// ============================================================
// TELA DE LOGIN - Login.jsx
// ============================================================
// Responsável por autenticar o usuário.
// Ao logar, salva token/usuário no localStorage e redireciona ao Dashboard.
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState({ email: "coordenacao@coopen.com", senha: "123456" });
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar(evento) {
    evento.preventDefault();
    setMensagemErro("");
    setCarregando(true);
    try {
      const { data } = await api.post("/auth/login", formulario);
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navegar("/dashboard");
    } catch (erro) {
      setMensagemErro(erro.response?.data?.erro || "Erro ao fazer login");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="bg-zinc-800 rounded-2xl shadow-xl w-full max-w-md p-8 border border-zinc-700">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <h1 className="text-2xl font-bold text-yellow-400">
            Dashboard Pedagógico
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Escola Cooperativa Coopen
          </p>
        </div>
        <form onSubmit={aoEnviar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
              className="w-full border border-zinc-600 bg-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-zinc-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={formulario.senha}
              onChange={(e) =>
                setFormulario({ ...formulario, senha: e.target.value })
              }
              className="w-full border border-zinc-600 bg-zinc-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          {mensagemErro && (
            <p className="text-red-400 text-sm bg-red-900/30 p-3 rounded-lg">
              {mensagemErro}
            </p>
          )}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="text-center text-xs text-zinc-500 mt-6">
          TCC/Projeto Integrador - UNIVERSIDADE VIRTUAL DO ESTADO DE SÃO PAULO
        </p>
      </div>
    </div>
  );
}
