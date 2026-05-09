<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    public function index(Request $request)
    {
        $query = Aluno::query();

        if ($request->has('turma')) {
            $query->where('turma', $request->turma);
        }

        if ($request->has('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->user()->funcao === 'professor') {
            $query->whereHas('professores', function ($q) {
                $q->where('professor_id', auth()->id());
            });
        }

        return response()->json([
            'success' => true,
            'alunos' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'matricula' => 'required|unique:alunos',
            'email' => 'email|nullable',
            'telefone' => 'nullable',
            'turma' => 'required'
        ]);

        $aluno = Aluno::create($request->all());

        return response()->json([
            'success' => true,
            'aluno' => $aluno
        ], 201);
    }

    public function show(Aluno $aluno)
    {
        return response()->json([
            'success' => true,
            'aluno' => $aluno->load(['notas', 'faltas', 'professores'])
        ]);
    }

    public function update(Request $request, Aluno $aluno)
    {
        $request->validate([
            'nome' => 'string',
            'matricula' => 'unique:alunos,matricula,' . $aluno->id,
            'email' => 'email|nullable',
            'telefone' => 'nullable',
            'turma' => 'string'
        ]);

        $aluno->update($request->all());

        return response()->json([
            'success' => true,
            'aluno' => $aluno
        ]);
    }

    public function destroy(Aluno $aluno)
    {
        $aluno->delete();

        return response()->json([
            'success' => true,
            'message' => 'Aluno deletado com sucesso'
        ]);
    }
}
