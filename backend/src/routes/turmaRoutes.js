// ============================================================
// ROTAS DE TURMAS — turmaRoutes.js
// ============================================================
// GET /api/turmas     → lista todas as turmas com indicadores
// GET /api/turmas/:id → detalhe de uma turma com seus alunos
// ============================================================

import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware.js";
import { listar, detalhe } from "../controllers/turmaController.js";

const roteador = Router();
roteador.use(autenticar);
roteador.get("/",    listar);
roteador.get("/:id", detalhe);
export default roteador;
