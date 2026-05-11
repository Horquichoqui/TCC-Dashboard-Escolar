<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("CREATE TABLE IF NOT EXISTS usuarios (id BIGSERIAL PRIMARY KEY, nome VARCHAR(255), email VARCHAR(255) UNIQUE, senha VARCHAR(255), funcao VARCHAR(255) DEFAULT 'professor', created_at TIMESTAMP, updated_at TIMESTAMP)");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS usuarios CASCADE");
    }
};
