<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Models\Aluno;
use Illuminate\Http\Request;

class NotaController extends Controller
{
    public function index(Request $request)
    {
        $query = Nota::with(['aluno', 'disciplina']);

        if ($request->has('aluno_id')) {
            $query->where('aluno_id', $request->aluno_id);
        }

        if ($request->has('disciplina_id')) {
            $query->where('disciplina_id', $request->disciplina_id);
        }

        return response()->json([
            'success' => true,
            'notas' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'aluno_id' => 'required|exists:alunos,id',
            'disciplina_id' => 'required|exists:disciplinas,id',
            'valor_nota' => 'required|numeric|min:0|max:10',
            'semestre' => 'required|integer'
        ]);

        $nota = Nota::create($request->all());

        return response()->json([
            'success' => true,
            'nota' => $nota->load(['aluno', 'disciplina'])
        ], 201);
    }

    public function show(Nota $nota)
    {
        return response()->json([
            'success' => true,
            'nota' => $nota->load(['aluno', 'disciplina'])
        ]);
    }

    public function update(Request $request, Nota $nota)
    {
        $request->validate([
            'valor_nota' => 'numeric|min:0|max:10',
            'semestre' => 'integer'
        ]);

        $nota->update($request->all());

        return response()->json([
            'success' => true,
            'nota' => $nota->load(['aluno', 'disciplina'])
        ]);
    }

    public function destroy(Nota $nota)
    {
        $nota->delete();

        return response()->json([
            'success' => true,
            'message' => 'Nota deletada com sucesso'
        ]);
    }
}
