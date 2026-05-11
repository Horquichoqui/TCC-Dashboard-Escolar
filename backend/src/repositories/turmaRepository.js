// ============================================================
// REPOSITÓRIO DE TURMAS — turmaRepository.js
// ============================================================
// Centraliza as consultas SQL da tabela "turmas".
// Retorna turmas com indicadores agregados dos alunos.
// ============================================================

import { pool } from "../db.js";

// Lista todas as turmas com estatísticas: média, frequência e alunos em risco
export async function listarTurmas(filtros = {}) {
  const { ano_letivo } = filtros;
  const parametros = [];
  let condicaoSQL = "";

  if (ano_letivo) {
    parametros.push(ano_letivo);
    condicaoSQL = "WHERE t.ano_letivo = $1";
  }

  const resultado = await pool.query(`
    SELECT
      t.id, t.nome, t.ano_letivo, t.turno,
      COUNT(a.id) AS total_alunos,
      ROUND(AVG(n.nota)::numeric, 2) AS media_turma,
      ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia_media,
      COUNT(CASE WHEN med.media < 6 OR frq.freq < 75 THEN 1 END) AS alunos_em_risco
    FROM turmas t
    LEFT JOIN alunos a ON a.turma_id = t.id AND a.ativo = TRUE
    LEFT JOIN notas n ON n.aluno_id = a.id
    LEFT JOIN frequencias f ON f.aluno_id = a.id
    LEFT JOIN (
      SELECT aluno_id, AVG(nota) AS media FROM notas GROUP BY aluno_id
    ) med ON med.aluno_id = a.id
    LEFT JOIN (
      SELECT aluno_id, AVG(percentual_frequencia) AS freq FROM frequencias GROUP BY aluno_id
    ) frq ON frq.aluno_id = a.id
    ${condicaoSQL}
    GROUP BY t.id, t.nome, t.ano_letivo, t.turno
    ORDER BY t.ano_letivo DESC, t.nome
  `, parametros);

  return resultado.rows;
}

// Retorna os dados de uma turma específica com a lista de seus alunos
export async function buscarTurmaPorId(id) {
  const turma = await pool.query("SELECT * FROM turmas WHERE id = $1", [id]);
  if (!turma.rows[0]) return null;

  const alunos = await pool.query(`
    SELECT
      a.id, a.nome, a.matricula,
      ROUND(AVG(n.nota)::numeric, 2) AS media_geral,
      ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia_media
    FROM alunos a
    LEFT JOIN notas n ON n.aluno_id = a.id
    LEFT JOIN frequencias f ON f.aluno_id = a.id
    WHERE a.turma_id = $1 AND a.ativo = TRUE
    GROUP BY a.id, a.nome, a.matricula
    ORDER BY a.nome
  `, [id]);

  return { ...turma.rows[0], alunos: alunos.rows };
}
