<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\FaltaController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\DiaLetivoController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('alunos', AlunoController::class);
    Route::apiResource('notas', NotaController::class);
    Route::apiResource('faltas', FaltaController::class);
    Route::apiResource('disciplinas', DisciplinaController::class);
    Route::apiResource('dias-letivos', DiaLetivoController::class);

    Route::get('/faltas/presenca/{alunoId}/{bimestre}', [FaltaController::class, 'presencaAluno']);
    Route::get('/relatorio/alunos-em-risco', [FaltaController::class, 'alunosEmRisco']);
});
