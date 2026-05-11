// ============================================================
// ROTA DE SAÚDE — healthRoutes.js
// ============================================================
// GET /api/health → verifica se o servidor e o banco estão funcionando.
// Útil para confirmar que o deploy no Render está ok.
// ============================================================

import { Router } from "express";
import { pool } from "../db.js";

const roteador = Router();

roteador.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1"); // Consulta simples para testar a conexão
    return res.json({
      status: "ok",
      banco: "conectado",
      mensagem: "Backend conectado ao Neon com sucesso",
    });
  } catch (erro) {
    return res.status(500).json({
      status: "erro",
      banco: "desconectado",
      mensagem: erro.message,
    });
  }
});

export default roteador;
