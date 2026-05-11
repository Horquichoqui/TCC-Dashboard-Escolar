<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("CREATE TABLE IF NOT EXISTS alunos (id BIGSERIAL PRIMARY KEY, nome VARCHAR(255), matricula VARCHAR(255) UNIQUE, email VARCHAR(255), telefone VARCHAR(255), turma VARCHAR(255), usuario_id BIGINT, created_at TIMESTAMP, updated_at TIMESTAMP)");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS alunos CASCADE");
    }
};
