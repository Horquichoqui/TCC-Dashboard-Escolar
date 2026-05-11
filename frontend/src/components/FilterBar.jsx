// ============================================================
// BARRA DE FILTROS — FilterBar.jsx
// ============================================================
// Exibe os filtros de turma, disciplina, período e situação.
// Ao alterar qualquer filtro, notifica o componente pai via onChange.
// ============================================================

import React from "react";

export default function FilterBar({ filtros, onChange, opcoesTurmas = [], opcoesDisciplinas = [], opcoesPeriodos = [] }) {
  // Quando qualquer select muda, atualiza o filtro correspondente
  function aoAlterar(evento) {
    onChange({ ...filtros, [evento.target.name]: evento.target.value });
  }

  const selectClass = "border border-gray-200 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400";

      {/* Filtro por turma */}
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 p-4 flex flex-wrap gap-3 items-end">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Turma</label>
        <select name="turma_id" value={filtros.turma_id || ""} onChange={aoAlterar} className={selectClass}>
          <option value="">Todas as turmas</option>
          {opcoesTurmas.map((t) => <option key={t.id} value={t.id}>{t.nome}</option>)}
        </select>
      </div>
      {/* Filtro por disciplina (exibido apenas quando há opções disponíveis) */}
      {opcoesDisciplinas.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Disciplina</label>
          <select name="disciplina_id" value={filtros.disciplina_id || ""} onChange={aoAlterar} className={selectClass}>
            <option value="">Todas</option>
            {opcoesDisciplinas.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
          </select>
        </div>
      )}
      {/* Filtro por período letivo (exibido apenas quando há opções disponíveis) */}
      {opcoesPeriodos.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Período</label>
          <select name="periodo_id" value={filtros.periodo_id || ""} onChange={aoAlterar} className={selectClass}>
            <option value="">Todos</option>
            {opcoesPeriodos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
          </select>
        </div>
      )}
      {/* Filtro por situação pedagógica */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 dark:text-zinc-400 font-medium">Situação</label>
        <select name="situacao" value={filtros.situacao || ""} onChange={aoAlterar} className={selectClass}>
          <option value="">Todas</option>
          <option value="Risco">Risco</option>
          <option value="Atenção">Atenção</option>
          <option value="Regular">Regular</option>
        </select>
      </div>
    </div>
  );
}
