// ============================================================
// REPOSITÓRIO DE RELATÓRIOS — relatorioRepository.js
// ============================================================
// Consulta SQL para exportação de dados de alunos em CSV.
// ============================================================

import { pool } from "../db.js";

// Retorna os dados de todos os alunos necessários para o CSV
export async function buscarAlunosParaExportacao(filtros = {}) {
  const { turma_id } = filtros;
  const parametros = [];
  let condicaoSQL = "WHERE a.ativo = TRUE";

  if (turma_id) {
    parametros.push(turma_id);
    condicaoSQL += ` AND a.turma_id = $${parametros.length}`;
  }

  const resultado = await pool.query(`
    SELECT
      a.nome,
      a.matricula,
      t.nome AS turma,
      ROUND(AVG(n.nota)::numeric, 2) AS media_geral,
      ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia
    FROM alunos a
    LEFT JOIN turmas t ON t.id = a.turma_id
    LEFT JOIN notas n ON n.aluno_id = a.id
    LEFT JOIN frequencias f ON f.aluno_id = a.id
    ${condicaoSQL}
    GROUP BY a.id, a.nome, a.matricula, t.nome
    ORDER BY a.nome
  `, parametros);

  return resultado.rows;
}
