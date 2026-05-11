// Script para criar as tabelas no banco Neon
// Lê o arquivo schema.sql e executa no banco
// Não apaga dados existentes (usa CREATE TABLE IF NOT EXISTS)
import "dotenv/config";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { pool } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  console.log("🚀 Iniciando criação das tabelas no banco Neon...");

  try {
    // Lê o arquivo SQL com o schema das tabelas
    const schemaPath = path.join(__dirname, "schema.sql");
    const sql = readFileSync(schemaPath, "utf-8");

    // Executa o SQL no banco
    await pool.query(sql);

    console.log("✅ Tabelas criadas com sucesso!");
    console.log("   Tabelas: usuarios, turmas, alunos, disciplinas, periodos_letivos, notas, frequencias, integracoes_sponte");
  } catch (error) {
    console.error("❌ Erro ao criar tabelas:", error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
