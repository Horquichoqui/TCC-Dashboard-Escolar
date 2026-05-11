// ============================================================
// CONEXÃO COM O BANCO DE DADOS — db.js
// ============================================================
// Este arquivo cria e exporta a conexão com o banco PostgreSQL
// hospedado no Neon. Toda consulta SQL do sistema passa por aqui.
// O Pool é um conjunto de conexões reutilizáveis com o banco.
// ============================================================

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

// Verificação de segurança: o sistema não sobe sem a URL do banco configurada
if (!process.env.DATABASE_URL) {
  throw new Error(
    "Variável DATABASE_URL não configurada. Configure o arquivo .env local ou as Environment Variables do Render."
  );
}

// Cria o pool de conexões usando a URL do banco Neon
// ssl rejectUnauthorized: false é necessário para conectar no Neon via SSL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Função chamada ao iniciar o servidor para confirmar que o banco está acessível
export async function testConnection() {
  try {
    const resultado = await pool.query("SELECT NOW() AS agora");
    console.log("✅ Banco Neon conectado com sucesso:", resultado.rows[0].agora);
    return true;
  } catch (erro) {
    console.error("❌ Erro ao conectar no banco Neon:", erro.message);
    throw erro;
  }
}
