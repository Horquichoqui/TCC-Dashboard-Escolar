<?php

namespace App\Http\Controllers;

use App\Models\DiaLetivo;
use Illuminate\Http\Request;

class DiaLetivoController extends Controller
{
    public function index(Request $request)
    {
        $query = DiaLetivo::query();

        if ($request->has('ano')) {
            $query->where('ano', $request->ano);
        }

        return response()->json([
            'success' => true,
            'dias_letivos' => $query->orderBy('bimestre')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ano' => 'required|integer|min:2000|max:' . date('Y') + 1,
            'bimestre' => 'required|integer|min:1|max:4',
            'dias' => 'required|integer|min:1|max:100'
        ]);

        $diaLetivo = DiaLetivo::updateOrCreate(
            ['ano' => $request->ano, 'bimestre' => $request->bimestre],
            ['dias' => $request->dias]
        );

        return response()->json([
            'success' => true,
            'dia_letivo' => $diaLetivo
        ], 201);
    }

    public function show($id)
    {
        $diaLetivo = DiaLetivo::findOrFail($id);

        return response()->json([
            'success' => true,
            'dia_letivo' => $diaLetivo
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'dias' => 'required|integer|min:1|max:100'
        ]);

        $diaLetivo = DiaLetivo::findOrFail($id);
        $diaLetivo->update($request->all());

        return response()->json([
            'success' => true,
            'dia_letivo' => $diaLetivo
        ]);
    }

    public function destroy($id)
    {
        $diaLetivo = DiaLetivo::findOrFail($id);
        $diaLetivo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Dias letivos deletados com sucesso'
        ]);
    }
}
