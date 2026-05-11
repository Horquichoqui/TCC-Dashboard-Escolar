// ============================================================
// CONTROLLER DE RELATÓRIOS — relatorioController.js
// ============================================================
// Gera e entrega o arquivo CSV com a lista de alunos em risco.
// O arquivo pode ser aberto diretamente no Excel.
// ============================================================

import { calcularRisco } from "../utils/calculadoraRisco.js";
import { buscarAlunosParaExportacao } from "../repositories/relatorioRepository.js";
import { gerarCSV } from "../utils/csv.js";

// Exporta os alunos em risco ou atenção no formato CSV
export async function exportarAlunosRisco(req, res) {
  try {
    const filtros = { turma_id: req.query.turma_id };
    const alunos = await buscarAlunosParaExportacao(filtros);

    // Filtra apenas os alunos que precisam de atenção
    const alunosEmRisco = alunos
      .map((aluno) => ({
        ...aluno,
        ...calcularRisco(parseFloat(aluno.media_geral) || 0, parseFloat(aluno.frequencia) || 0),
      }))
      .filter((aluno) => aluno.situacao === "Risco" || aluno.situacao === "Atenção");

    // Define as colunas do arquivo CSV
    const cabecalho = ["nome", "matricula", "turma", "media_geral", "frequencia", "situacao", "motivo"];

    // Monta as linhas com os dados de cada aluno
    const linhas = alunosEmRisco.map((aluno) => [
      aluno.nome, aluno.matricula, aluno.turma,
      aluno.media_geral, aluno.frequencia,
      aluno.situacao, aluno.motivo,
    ]);

    const arquivoCSV = gerarCSV(cabecalho, linhas);

    // Cabeçalhos HTTP para forçar o download do arquivo no navegador
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="alunos_em_risco.csv"');

    // BOM UTF-8 garante que o Excel abre o arquivo com acentos corretamente
    return res.send("﻿" + arquivoCSV);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}
