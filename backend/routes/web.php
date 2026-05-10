<?php

use Illuminate\Support\Facades\Route;

// Todas as rotas não-API retornam o React SPA (index.html compilado)
Route::get('/{any}', function () {
    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    return response()->json(['status' => 'Dashboard API online']);
})->where('any', '.*');
