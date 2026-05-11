// Calculadora de risco pedagógico
// Classifica cada aluno em: Regular, Atenção ou Risco
// com base na média de notas e percentual de frequência
import { regrasRisco } from "../config/regrasRisco.js";

/**
 * Calcula a situação de risco de um aluno.
 * @param {number} media - Média geral do aluno (0 a 10)
 * @param {number} frequencia - Percentual de frequência do aluno (0 a 100)
 * @returns {{ situacao: string, motivo: string }}
 */
export function calcularRisco(media, frequencia) {
  const { mediaMinima, mediaBoa, frequenciaMinima, frequenciaAtencao } = regrasRisco;

  // Situação de RISCO: média abaixo do mínimo ou frequência abaixo do limite legal
  if (media < mediaMinima) {
    return { situacao: "Risco", motivo: `Média ${Number(media).toFixed(1)} abaixo de ${mediaMinima}.0` };
  }

  if (frequencia < frequenciaMinima) {
    return { situacao: "Risco", motivo: `Frequência ${Number(frequencia).toFixed(1)}% abaixo do mínimo de ${frequenciaMinima}%` };
  }

  // Situação de ATENÇÃO: média entre mínimo e bom, ou frequência perto do limite
  if (media < mediaBoa) {
    return { situacao: "Atenção", motivo: `Média ${Number(media).toFixed(1)} próxima ao limite mínimo` };
  }

  if (frequencia <= frequenciaAtencao) {
    return { situacao: "Atenção", motivo: `Frequência ${Number(frequencia).toFixed(1)}% próxima ao limite mínimo` };
  }

  // Situação REGULAR: dentro dos critérios esperados
  return { situacao: "Regular", motivo: "Aluno dentro dos critérios esperados" };
}
