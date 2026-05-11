// ============================================================
// ROTAS DE RELATÓRIOS — relatorioRoutes.js
// ============================================================
// GET /api/relatorios/alunos-risco/exportar → baixa CSV dos alunos em risco
// ============================================================

import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware.js";
import { exportarAlunosRisco } from "../controllers/relatorioController.js";

const roteador = Router();
roteador.use(autenticar);
roteador.get("/alunos-risco/exportar", exportarAlunosRisco);
export default roteador;
