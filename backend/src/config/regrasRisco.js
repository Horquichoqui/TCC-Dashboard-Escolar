// Regras pedagógicas para classificação de alunos em risco
// Esses valores são usados pela calculadoraRisco para determinar a situação do aluno
export const regrasRisco = {
  mediaMinima: 6,       // Média abaixo disso = Risco
  mediaBoa: 7,          // Média acima disso = Regular (se frequência ok)
  frequenciaMinima: 75, // Frequência abaixo disso = Risco
  frequenciaAtencao: 80 // Frequência entre 75 e 80 = Atenção
};
