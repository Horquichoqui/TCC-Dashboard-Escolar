<?php

use Illuminate\Support\Facades\Route;

// Serve o React SPA para qualquer rota que não seja API nem arquivo estático
Route::get('/{any}', function () {
    return response()->file(public_path('index.html'));
})->where('any', '.*');
