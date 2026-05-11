// ============================================================
// REPOSITÓRIO DE USUÁRIOS — usuarioRepository.js
// ============================================================
// Centraliza as consultas SQL da tabela "usuarios".
// Usado pelo controller de autenticação para verificar o login.
// ============================================================

import { pool } from "../db.js";

// Busca um usuário pelo e-mail (usado no login)
export async function buscarPorEmail(email) {
  const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  return resultado.rows[0] || null;
}

// Busca um usuário pelo ID (usado para retornar dados do usuário logado)
export async function buscarPorId(id) {
  const resultado = await pool.query(
    "SELECT id, nome, email, perfil FROM usuarios WHERE id = $1",
    [id]
  );
  return resultado.rows[0] || null;
}
