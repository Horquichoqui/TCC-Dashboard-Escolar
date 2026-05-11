// ============================================================
// CONTROLLER DE TURMAS — turmaController.js
// ============================================================
// Responsável por listar turmas com seus indicadores agregados
// e retornar os detalhes de uma turma com seus alunos.
// ============================================================

import { listarTurmas, buscarTurmaPorId } from "../repositories/turmaRepository.js";

// Lista todas as turmas com média, frequência e contagem de alunos em risco
export async function listar(req, res) {
  try {
    const filtros = { ano_letivo: req.query.ano_letivo };
    const turmas = await listarTurmas(filtros);
    return res.json(turmas);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Retorna os dados de uma turma específica com a lista de seus alunos
export async function detalhe(req, res) {
  try {
    const turma = await buscarTurmaPorId(req.params.id);
    if (!turma) return res.status(404).json({ erro: "Turma não encontrada" });
    return res.json(turma);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}
