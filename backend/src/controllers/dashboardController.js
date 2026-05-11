// ============================================================
// CONTROLLER DO DASHBOARD — dashboardController.js
// ============================================================
// Fornece os dados para os cards de indicadores e gráficos
// exibidos na tela principal do sistema.
// ============================================================

import { calcularRisco } from "../utils/calculadoraRisco.js";
import {
  buscarResumo,
  buscarRiscoPorTurma,
  buscarEvolucaoDesempenho,
  buscarFrequenciaPorTurma,
  buscarDistribuicaoSituacao,
} from "../repositories/dashboardRepository.js";

// Cards de resumo: total de alunos, média geral, frequência média, total de turmas
export async function resumo(req, res) {
  try {
    const filtros = { ano_letivo: req.query.ano_letivo, turma_id: req.query.turma_id };
    const dados = await buscarResumo(filtros);
    return res.json(dados);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Gráfico de barras: quantos alunos em risco por turma
export async function riscoPorTurma(req, res) {
  try {
    const dados = await buscarRiscoPorTurma();
    return res.json(dados);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Gráfico de linha: evolução da média por período letivo (bimestres)
export async function evolucaoDesempenho(req, res) {
  try {
    const dados = await buscarEvolucaoDesempenho();
    return res.json(dados);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Gráfico de barras: frequência média de cada turma
export async function frequenciaPorTurma(req, res) {
  try {
    const dados = await buscarFrequenciaPorTurma();
    return res.json(dados);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

// Gráfico de pizza: quantos alunos estão em cada situação (Regular, Atenção, Risco)
export async function distribuicaoSituacao(req, res) {
  try {
    const alunos = await buscarDistribuicaoSituacao();
    const contagem = { Regular: 0, "Atenção": 0, Risco: 0 };
    for (const aluno of alunos) {
      const { situacao } = calcularRisco(parseFloat(aluno.media) || 0, parseFloat(aluno.frequencia) || 0);
      contagem[situacao] = (contagem[situacao] || 0) + 1;
    }
    return res.json(contagem);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}
