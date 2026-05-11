// ============================================================
// REPOSITÓRIO DE ALUNOS — alunoRepository.js
// ============================================================
// Centraliza as consultas SQL da tabela "alunos".
// Retorna dados de alunos com suas médias e frequências calculadas.
// ============================================================

import { pool } from "../db.js";

// Lista todos os alunos com média geral e frequência média calculadas
export async function listarAlunos(filtros = {}) {
  const { turma_id, ativo = true } = filtros;
  const parametros = [ativo];
  let condicaoSQL = "WHERE a.ativo = $1";

  if (turma_id) {
    parametros.push(turma_id);
    condicaoSQL += ` AND a.turma_id = $${parametros.length}`;
  }

  const resultado = await pool.query(`
    SELECT
      a.id, a.nome, a.matricula, a.ativo,
      t.nome AS turma,
      t.id AS turma_id,
      ROUND(AVG(n.nota)::numeric, 2) AS media_geral,
      ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia_media
    FROM alunos a
    LEFT JOIN turmas t ON t.id = a.turma_id
    LEFT JOIN notas n ON n.aluno_id = a.id
    LEFT JOIN frequencias f ON f.aluno_id = a.id
    ${condicaoSQL}
    GROUP BY a.id, a.nome, a.matricula, a.ativo, t.nome, t.id
    ORDER BY a.nome
  `, parametros);

  return resultado.rows;
}

// Retorna todos os dados de um aluno: dados básicos, notas e frequências
export async function buscarAlunoPorId(id) {
  const dadosAluno = await pool.query(`
    SELECT
      a.id, a.nome, a.matricula, a.ativo,
      t.nome AS turma,
      t.id AS turma_id
    FROM alunos a
    LEFT JOIN turmas t ON t.id = a.turma_id
    WHERE a.id = $1
  `, [id]);

  if (!dadosAluno.rows[0]) return null;

  // Busca as notas do aluno por disciplina e período
  const notas = await pool.query(`
    SELECT
      d.nome AS disciplina,
      p.nome AS periodo,
      n.nota
    FROM notas n
    JOIN disciplinas d ON d.id = n.disciplina_id
    LEFT JOIN periodos_letivos p ON p.id = n.periodo_id
    WHERE n.aluno_id = $1
    ORDER BY p.id, d.nome
  `, [id]);

  // Busca a frequência do aluno por disciplina
  const frequencias = await pool.query(`
    SELECT
      d.nome AS disciplina,
      f.total_aulas,
      f.total_presencas,
      f.percentual_frequencia
    FROM frequencias f
    JOIN disciplinas d ON d.id = f.disciplina_id
    WHERE f.aluno_id = $1
    ORDER BY d.nome
  `, [id]);

  // Calcula a média geral e frequência geral do aluno
  const mediaGeral = await pool.query(
    "SELECT ROUND(AVG(nota)::numeric, 2) AS media FROM notas WHERE aluno_id = $1", [id]
  );
  const frequenciaGeral = await pool.query(
    "SELECT ROUND(AVG(percentual_frequencia)::numeric, 2) AS frequencia FROM frequencias WHERE aluno_id = $1", [id]
  );

  return {
    ...dadosAluno.rows[0],
    media_geral: parseFloat(mediaGeral.rows[0].media) || 0,
    frequencia_media: parseFloat(frequenciaGeral.rows[0].frequencia) || 0,
    notas: notas.rows,
    frequencias: frequencias.rows,
  };
}
