// ============================================================
// MIDDLEWARE DE ERROS — errorMiddleware.js
// ============================================================
// Captura qualquer erro não tratado nas rotas e retorna uma
// resposta padronizada. Evita que o servidor trave ou exponha
// detalhes internos desnecessários.
// ============================================================

export function tratarErro(erro, req, res, next) {
  console.error("Erro:", erro.message);
  res.status(500).json({ erro: "Erro interno do servidor", detalhe: erro.message });
}
