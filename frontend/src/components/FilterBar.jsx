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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-3 items-end">

      {/* Filtro por turma */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Turma</label>
        <select name="turma_id" value={filtros.turma_id || ""} onChange={aoAlterar}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option value="">Todas as turmas</option>
          {opcoesTurmas.map((turma) => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
      </div>

      {/* Filtro por disciplina (exibido apenas quando há opções disponíveis) */}
      {opcoesDisciplinas.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Disciplina</label>
          <select name="disciplina_id" value={filtros.disciplina_id || ""} onChange={aoAlterar}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">Todas</option>
            {opcoesDisciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>{disciplina.nome}</option>
            ))}
          </select>
        </div>
      )}

      {/* Filtro por período letivo (exibido apenas quando há opções disponíveis) */}
      {opcoesPeriodos.length > 0 && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium">Período</label>
          <select name="periodo_id" value={filtros.periodo_id || ""} onChange={aoAlterar}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option value="">Todos</option>
            {opcoesPeriodos.map((periodo) => (
              <option key={periodo.id} value={periodo.id}>{periodo.nome}</option>
            ))}
          </select>
        </div>
      )}

      {/* Filtro por situação pedagógica */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">Situação</label>
        <select name="situacao" value={filtros.situacao || ""} onChange={aoAlterar}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option value="">Todas</option>
          <option value="Risco">Risco</option>
          <option value="Atenção">Atenção</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

    </div>
  );
}
