// ============================================================
// ROTAS DE AUTENTICAÇÃO — authRoutes.js
// ============================================================
// POST /api/auth/login  → faz o login e retorna o token JWT
// GET  /api/auth/me     → retorna os dados do usuário logado
// ============================================================

import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { autenticar } from "../middlewares/authMiddleware.js";

const roteador = Router();
roteador.post("/login", login);
roteador.get("/me", autenticar, me);
export default roteador;
