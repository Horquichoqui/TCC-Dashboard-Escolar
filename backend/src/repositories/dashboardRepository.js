// ============================================================
// REPOSITÓRIO DO DASHBOARD — dashboardRepository.js
// ============================================================
// Consultas SQL que alimentam os cards de indicadores e gráficos
// da tela principal do sistema.
// ============================================================

import { pool } from "../db.js";

// Retorna os totais e médias para os cards do dashboard
export async function buscarResumo(filtros = {}) {
  const { ano_letivo, turma_id } = filtros;

  let condicaoSQL = "WHERE a.ativo = TRUE";
  const parametros = [];

  if (turma_id) {
    parametros.push(turma_id);
    condicaoSQL += ` AND a.turma_id = $${parametros.length}`;
  }

  // Total de alunos ativos
  const totalAlunos = await pool.query(
    `SELECT COUNT(*) AS total FROM alunos a ${condicaoSQL}`,
    parametros
  );

  // Média geral de todas as notas
  const mediaGeral = await pool.query(`
    SELECT ROUND(AVG(n.nota)::numeric, 2) AS media
    FROM notas n
    JOIN alunos a ON a.id = n.aluno_id
    ${condicaoSQL}
  `, parametros);

  // Frequência média de todos os alunos
  const frequenciaMedia = await pool.query(`
    SELECT ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia
    FROM frequencias f
    JOIN alunos a ON a.id = f.aluno_id
    ${condicaoSQL}
  `, parametros);

  // Total de turmas com alunos ativos
  const totalTurmas = await pool.query(`
    SELECT COUNT(DISTINCT t.id) AS total
    FROM turmas t
    JOIN alunos a ON a.turma_id = t.id
    WHERE a.ativo = TRUE
    ${ano_letivo ? "AND t.ano_letivo = $1" : ""}
  `, ano_letivo ? [ano_letivo] : []);

  return {
    total_alunos: parseInt(totalAlunos.rows[0].total),
    media_geral: parseFloat(mediaGeral.rows[0].media) || 0,
    frequencia_media: parseFloat(frequenciaMedia.rows[0].frequencia) || 0,
    total_turmas: parseInt(totalTurmas.rows[0].total),
  };
}

// Dados para o gráfico: alunos em risco agrupados por turma
export async function buscarRiscoPorTurma() {
  const resultado = await pool.query(`
    SELECT
      t.nome AS turma,
      COUNT(a.id) AS total_alunos,
      COUNT(CASE WHEN med.media < 6 OR freq.freq < 75 THEN 1 END) AS em_risco
    FROM turmas t
    LEFT JOIN alunos a ON a.turma_id = t.id AND a.ativo = TRUE
    LEFT JOIN (
      SELECT aluno_id, AVG(nota) AS media FROM notas GROUP BY aluno_id
    ) med ON med.aluno_id = a.id
    LEFT JOIN (
      SELECT aluno_id, AVG(percentual_frequencia) AS freq FROM frequencias GROUP BY aluno_id
    ) freq ON freq.aluno_id = a.id
    GROUP BY t.id, t.nome
    ORDER BY t.nome
  `);
  return resultado.rows;
}

// Dados para o gráfico de linha: média por bimestre
export async function buscarEvolucaoDesempenho() {
  const resultado = await pool.query(`
    SELECT
      p.nome AS periodo,
      ROUND(AVG(n.nota)::numeric, 2) AS media
    FROM notas n
    JOIN periodos_letivos p ON p.id = n.periodo_id
    GROUP BY p.id, p.nome
    ORDER BY p.id
  `);
  return resultado.rows;
}

// Dados para o gráfico de barras: frequência média por turma
export async function buscarFrequenciaPorTurma() {
  const resultado = await pool.query(`
    SELECT
      t.nome AS turma,
      ROUND(AVG(f.percentual_frequencia)::numeric, 2) AS frequencia_media
    FROM frequencias f
    JOIN alunos a ON a.id = f.aluno_id
    JOIN turmas t ON t.id = a.turma_id
    WHERE a.ativo = TRUE
    GROUP BY t.id, t.nome
    ORDER BY t.nome
  `);
  return resultado.rows;
}

// Dados para o gráfico de pizza: média e frequência de cada aluno (para calcular situação)
export async function buscarDistribuicaoSituacao() {
  const resultado = await pool.query(`
    SELECT
      a.id,
      AVG(n.nota) AS media,
      AVG(f.percentual_frequencia) AS frequencia
    FROM alunos a
    LEFT JOIN notas n ON n.aluno_id = a.id
    LEFT JOIN frequencias f ON f.aluno_id = a.id
    WHERE a.ativo = TRUE
    GROUP BY a.id
  `);
  return resultado.rows;
}
