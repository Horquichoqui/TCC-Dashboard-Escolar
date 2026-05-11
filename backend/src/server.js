// ============================================================
// SERVIDOR PRINCIPAL — server.js
// ============================================================
// Este arquivo é o ponto de entrada do sistema.
// Ele configura o Express, registra todas as rotas da API
// e, em produção, também entrega as telas do React para o navegador.
// ============================================================

import "dotenv/config"; // Carrega as variáveis do arquivo .env
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import { testConnection } from "./db.js";
import { tratarErro } from "./middlewares/errorMiddleware.js";

import rotasAutenticacao from "./routes/authRoutes.js";
import rotasDashboard from "./routes/dashboardRoutes.js";
import rotasAlunos from "./routes/alunoRoutes.js";
import rotasTurmas from "./routes/turmaRoutes.js";
import rotasRelatorios from "./routes/relatorioRoutes.js";
import rotasHealth from "./routes/healthRoutes.js";
import rotasBancoDados from "./routes/databaseRoutes.js";
import rotasIntegracao from "./routes/integracaoRoutes.js";

const app = express();
const PORTA = process.env.PORT || 3000;

// Necessário para descobrir o caminho da pasta atual (módulos ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Origens de frontend permitidas (somente para desenvolvimento local)
const origensPermitidas = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Helmet: adiciona cabeçalhos HTTP de segurança automaticamente
app.use(helmet({ contentSecurityPolicy: false }));

// CORS: em produção, frontend e backend estão na mesma URL (sem problema)
// Em desenvolvimento local, libera o endereço do Vite (porta 5173)
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? true : origensPermitidas,
  credentials: true,
}));

// Permite que o servidor leia o corpo das requisições no formato JSON
app.use(express.json());

// ============================================================
// ROTAS DA API
// Todas começam com /api para separar do frontend
// IMPORTANTE: devem ser registradas ANTES do frontend estático
// ============================================================
app.use("/api/auth",             rotasAutenticacao); // Login e dados do usuário
app.use("/api/dashboard",        rotasDashboard);    // Indicadores e gráficos
app.use("/api/alunos",           rotasAlunos);       // Lista e detalhe de alunos
app.use("/api/turmas",           rotasTurmas);       // Lista e detalhe de turmas
app.use("/api/relatorios",       rotasRelatorios);   // Exportação CSV
app.use("/api/health",           rotasHealth);       // Verificação de saúde do sistema
app.use("/api/banco-dados",      rotasBancoDados);   // Inspeção do banco (só desenvolvimento)
app.use("/api/integracao-sponte",rotasIntegracao);   // Status da integração Sponte

// ============================================================
// FRONTEND REACT EM PRODUÇÃO
// O Render sobe apenas o Node.js. O Express entrega os arquivos
// do React compilados (pasta frontend/dist) para o navegador.
// ============================================================
if (process.env.NODE_ENV === "production") {
  const pastaFrontend = path.join(__dirname, "../../frontend/dist");

  // Serve os arquivos estáticos do React (JS, CSS, imagens)
  app.use(express.static(pastaFrontend));

  // Qualquer rota que não seja /api é redirecionada para o index.html
  // Isso evita erro 404 ao recarregar /dashboard no navegador
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(pastaFrontend, "index.html"));
  });
}

// Middleware global de erros (captura erros não tratados nas rotas)
app.use(tratarErro);

// ============================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================
app.listen(PORTA, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
  console.log(`   Ambiente: ${process.env.NODE_ENV || "development"}`);
  try {
    await testConnection(); // Testa se o banco Neon está acessível
  } catch (erro) {
    console.error("⚠️  Servidor iniciado mas banco não conectado:", erro.message);
  }
});
