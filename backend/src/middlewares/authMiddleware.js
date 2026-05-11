// ============================================================
// MIDDLEWARE DE AUTENTICAÇÃO — authMiddleware.js
// ============================================================
// Todas as rotas protegidas passam por aqui antes de executar.
// O middleware lê o token JWT enviado pelo frontend e verifica
// se ele é válido. Se não for, bloqueia o acesso.
// ============================================================

import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
  // O frontend envia o token no cabeçalho: Authorization: Bearer <token>
  const cabecalhoAutorizacao = req.headers.authorization;

  if (!cabecalhoAutorizacao || !cabecalhoAutorizacao.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  // Extrai apenas o token (remove o prefixo "Bearer ")
  const token = cabecalhoAutorizacao.split(" ")[1];

  try {
    // Valida e decodifica o token usando a chave secreta JWT_SECRET
    const dadosToken = jwt.verify(token, process.env.JWT_SECRET);
    // Disponibiliza os dados do usuário para os controllers usarem
    req.usuario = dadosToken;
    next(); // Continua para a rota protegida
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
}
