// ============================================================
// CONTROLLER DE AUTENTICAÇÃO — authController.js
// ============================================================
// Responsável pelo login do usuário.
// Verifica e-mail e senha no banco, e gera um token JWT
// que o frontend usará para acessar as telas protegidas.
// ============================================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { buscarPorEmail, buscarPorId } from "../repositories/usuarioRepository.js";

// Rota: POST /api/auth/login
export async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  try {
    // Busca o usuário pelo e-mail no banco de dados
    const usuario = await buscarPorEmail(email);
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    // Compara a senha digitada com o hash salvo no banco (usando bcryptjs)
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) return res.status(401).json({ erro: "Credenciais inválidas" });

    // Gera o token JWT com os dados básicos do usuário (válido por 8 horas)
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Retorna o token e os dados do usuário (sem a senha)
    return res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
    });
  } catch (erro) {
    return res.status(500).json({ erro: "Erro interno", detalhe: erro.message });
  }
}

// Rota: GET /api/auth/me — retorna os dados do usuário logado
export async function me(req, res) {
  try {
    const usuario = await buscarPorId(req.usuario.id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    return res.json(usuario);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro interno", detalhe: erro.message });
  }
}
