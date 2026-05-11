// ============================================================
// ROTAS DE INTEGRAÇÃO SPONTE — integracaoRoutes.js
// ============================================================
// GET /api/integracao-sponte/status → retorna o status da integração.
// A integração real com o Sponte está prevista para versão futura.
// ============================================================

import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware.js";
import { pool } from "../db.js";

const roteador = Router();
roteador.use(autenticar);

roteador.get("/status", async (req, res) => {
  try {
    // Busca o último registro de integração salvo no banco
    const resultado = await pool.query(
      "SELECT * FROM integracoes_sponte ORDER BY id DESC LIMIT 1"
    );
    return res.json({
      origem: "Neon/PostgreSQL",
      integracao_futura: "API Sponte",
      registro: resultado.rows[0] || null,
    });
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

export default roteador;
