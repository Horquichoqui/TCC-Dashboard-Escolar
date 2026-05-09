<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use Illuminate\Http\Request;

class DisciplinaController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'disciplinas' => Disciplina::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|unique:disciplinas',
            'descricao' => 'nullable'
        ]);

        $disciplina = Disciplina::create($request->all());

        return response()->json([
            'success' => true,
            'disciplina' => $disciplina
        ], 201);
    }

    public function show(Disciplina $disciplina)
    {
        return response()->json([
            'success' => true,
            'disciplina' => $disciplina->load('notas')
        ]);
    }

    public function update(Request $request, Disciplina $disciplina)
    {
        $request->validate([
            'nome' => 'unique:disciplinas,nome,' . $disciplina->id,
            'descricao' => 'nullable'
        ]);

        $disciplina->update($request->all());

        return response()->json([
            'success' => true,
            'disciplina' => $disciplina
        ]);
    }

    public function destroy(Disciplina $disciplina)
    {
        $disciplina->delete();

        return response()->json([
            'success' => true,
            'message' => 'Disciplina deletada com sucesso'
        ]);
    }
}
