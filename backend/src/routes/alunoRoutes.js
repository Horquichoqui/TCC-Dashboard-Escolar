// ============================================================
// ROTAS DE ALUNOS — alunoRoutes.js
// ============================================================
// GET /api/alunos        → lista todos os alunos
// GET /api/alunos/risco  → lista alunos em Risco ou Atenção
// GET /api/alunos/:id    → detalhe de um aluno específico
// ============================================================

import { Router } from "express";
import { autenticar } from "../middlewares/authMiddleware.js";
import { listar, listarRisco, detalhe } from "../controllers/alunoController.js";

const roteador = Router();
roteador.use(autenticar);
roteador.get("/",      listar);
roteador.get("/risco", listarRisco);
roteador.get("/:id",   detalhe);
export default roteador;
