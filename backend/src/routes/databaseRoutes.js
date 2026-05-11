// ============================================================
// ROTAS DE INSPEÇÃO DO BANCO — databaseRoutes.js
// ============================================================
// Permite visualizar as tabelas e dados do banco via navegador.
// ATENÇÃO: usar apenas em desenvolvimento. Não expor em produção pública.
// ============================================================

import { Router } from "express";
import { pool } from "../db.js";

const roteador = Router();

// Lista todas as tabelas do banco
roteador.get("/tabelas", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT table_name AS nome_tabela
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    return res.json(resultado.rows);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

// Lista as colunas de uma tabela específica
roteador.get("/tabelas/:nomeDaTabela/colunas", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT column_name AS coluna, data_type AS tipo
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [req.params.nomeDaTabela]);
    return res.json(resultado.rows);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

// Retorna os primeiros 10 registros de uma tabela
roteador.get("/tabelas/:nomeDaTabela/amostra", async (req, res) => {
  try {
    const nomeDaTabela = req.params.nomeDaTabela.replace(/[^a-z_]/gi, "");
    const resultado = await pool.query(`SELECT * FROM ${nomeDaTabela} LIMIT 10`);
    return res.json(resultado.rows);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

export default roteador;
