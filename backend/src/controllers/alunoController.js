// ============================================================
// CONTROLLER DE ALUNOS — alunoController.js
// ============================================================
// Responsável por listar alunos, filtrar os que estão em risco
// e retornar o detalhe completo de um aluno específico.
// ============================================================

import { calcularRisco } from "../utils/calculadoraRisco.js";
import { listarAlunos, buscarAlunoPorId } from "../repositories/alunoRepository.js";

// Lista todos os alunos com sua situação calculada
export async function listar(req, res) {
  try {
    const filtros = { turma_id: req.query.turma_id };
    const alunos = await listarAlunos(filtros);

    // Adiciona a situação (Regular/Atenção/Risco) e o motivo em cada aluno
    const alunosComSituacao = alunos.map((aluno) => ({
      ...aluno,
      ...calcularRisco(parseFloat(aluno.media_geral) || 0, parseFloat(aluno.frequencia_media) || 0),
    }));

    return res.json(alunosComSituacao);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Lista apenas os alunos em situação de Risco ou Atenção
export async function listarRisco(req, res) {
  try {
    const filtros = { turma_id: req.query.turma_id };
    const alunos = await listarAlunos(filtros);

    const alunosEmRisco = alunos
      .map((aluno) => ({
        ...aluno,
        ...calcularRisco(parseFloat(aluno.media_geral) || 0, parseFloat(aluno.frequencia_media) || 0),
      }))
      .filter((aluno) => aluno.situacao === "Risco" || aluno.situacao === "Atenção");

    return res.json(alunosEmRisco);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Retorna todos os dados de um aluno específico (notas, frequências, situação)
export async function detalhe(req, res) {
  try {
    const aluno = await buscarAlunoPorId(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });

    const situacao = calcularRisco(
      parseFloat(aluno.media_geral) || 0,
      parseFloat(aluno.frequencia_media) || 0
    );

    return res.json({ ...aluno, ...situacao });
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}
