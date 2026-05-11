// ============================================================
// GERADOR DE CSV — csv.js
// ============================================================
// Gera o conteúdo de um arquivo CSV simples, sem bibliotecas externas.
// Usado para exportar a lista de alunos em risco para planilha.
// ============================================================

export function gerarCSV(cabecalho, linhas) {
  // Junta os títulos das colunas separados por ponto e vírgula
  const cabecalhoFormatado = cabecalho.join(";");

  // Formata cada linha envolvendo os valores em aspas para evitar problemas com vírgulas
  const linhasFormatadas = linhas.map((linha) =>
    linha.map((celula) => `"${String(celula ?? "").replace(/"/g, '""')}"`).join(";")
  );

  // Junta cabeçalho e linhas com quebras de linha
  return [cabecalhoFormatado, ...linhasFormatadas].join("\n");
}
