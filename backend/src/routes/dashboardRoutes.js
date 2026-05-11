// ============================================================
// ROTAS DO DASHBOARD — dashboardRoutes.js
// ============================================================
// Todas as rotas exigem token JWT (middleware autenticar).
// Fornecem dados para cards e gráficos da tela principal.
// ============================================================

import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware.js";
import {
  resumo,
  riscoPorTurma,
  evolucaoDesempenho,
  frequenciaPorTurma,
  distribuicaoSituacao,
} from "../controllers/dashboardController.js";

const roteador = Router();
roteador.use(autenticar); // Protege todas as rotas abaixo

roteador.get("/resumo",               resumo);               // Cards: totais e médias
roteador.get("/risco-por-turma",      riscoPorTurma);        // Gráfico de barras
roteador.get("/evolucao-desempenho",  evolucaoDesempenho);   // Gráfico de linha
roteador.get("/frequencia-por-turma", frequenciaPorTurma);   // Gráfico de barras
roteador.get("/distribuicao-situacao",distribuicaoSituacao); // Gráfico de pizza

export default roteador;
