<?php

namespace App\Http\Controllers;

use App\Models\Falta;
use Illuminate\Http\Request;

class FaltaController extends Controller
{
    public function index(Request $request)
    {
        $query = Falta::with('aluno');

        if ($request->has('aluno_id')) {
            $query->where('aluno_id', $request->aluno_id);
        }

        if ($request->has('data')) {
            $query->whereDate('data', $request->data);
        }

        return response()->json([
            'success' => true,
            'faltas' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'aluno_id' => 'required|exists:alunos,id',
            'data' => 'required|date',
            'presente' => 'required|boolean',
            'bimestre' => 'required|integer|min:1|max:4'
        ]);

        $falta = Falta::create($request->all());

        return response()->json([
            'success' => true,
            'falta' => $falta->load('aluno')
        ], 201);
    }

    public function show(Falta $falta)
    {
        return response()->json([
            'success' => true,
            'falta' => $falta->load('aluno')
        ]);
    }

    public function update(Request $request, Falta $falta)
    {
        $request->validate([
            'presente' => 'boolean'
        ]);

        $falta->update($request->all());

        return response()->json([
            'success' => true,
            'falta' => $falta->load('aluno')
        ]);
    }

    public function destroy(Falta $falta)
    {
        $falta->delete();

        return response()->json([
            'success' => true,
            'message' => 'Falta deletada com sucesso'
        ]);
    }

    public function presencaAluno($alunoId, $bimestre)
    {
        $aluno = \App\Models\Aluno::findOrFail($alunoId);
        $faltas = Falta::where('aluno_id', $alunoId)
            ->where('bimestre', $bimestre)
            ->get();

        $totalAulas = \App\Models\DiaLetivo::where('bimestre', $bimestre)->first()?->dias ?? 20;
        $faltas_count = $faltas->where('presente', false)->count();
        $presencas_count = $faltas->where('presente', true)->count();
        $percentual_presenca = $totalAulas > 0 ? round(($presencas_count / $totalAulas) * 100, 2) : 0;

        return response()->json([
            'success' => true,
            'aluno' => $aluno,
            'bimestre' => $bimestre,
            'total_aulas' => $totalAulas,
            'presencas' => $presencas_count,
            'faltas' => $faltas_count,
            'percentual_presenca' => $percentual_presenca,
            'em_risco' => $percentual_presenca < 75
        ]);
    }

    public function alunosEmRisco(Request $request)
    {
        $bimestre = $request->get('bimestre', 1);
        $ano = $request->get('ano', date('Y'));

        $alunos = \App\Models\Aluno::with(['notas', 'faltas'])
            ->get()
            ->map(function ($aluno) use ($bimestre) {
                $faltas = $aluno->faltas()->where('bimestre', $bimestre)->get();
                $totalAulas = \App\Models\DiaLetivo::where('bimestre', $bimestre)->first()?->dias ?? 20;

                $faltas_count = $faltas->where('presente', false)->count();
                $presencas_count = $faltas->where('presente', true)->count();
                $percentual_presenca = $totalAulas > 0 ? round(($presencas_count / $totalAulas) * 100, 2) : 0;

                $media_notas = $aluno->notas()
                    ->whereBetween('created_at', [
                        \Carbon\Carbon::now()->startOfYear(),
                        \Carbon\Carbon::now()->endOfYear()
                    ])
                    ->avg('valor_nota') ?? 0;

                return [
                    'id' => $aluno->id,
                    'nome' => $aluno->nome,
                    'matricula' => $aluno->matricula,
                    'turma' => $aluno->turma,
                    'media_notas' => round($media_notas, 2),
                    'percentual_presenca' => $percentual_presenca,
                    'em_risco_nota' => $media_notas < 5,
                    'em_risco_falta' => $percentual_presenca < 75,
                    'em_risco' => $media_notas < 5 || $percentual_presenca < 75
                ];
            })
            ->filter(fn($aluno) => $aluno['em_risco'])
            ->values();

        return response()->json([
            'success' => true,
            'bimestre' => $bimestre,
            'ano' => $ano,
            'alunos_em_risco' => $alunos,
            'total' => count($alunos)
        ]);
    }
}
