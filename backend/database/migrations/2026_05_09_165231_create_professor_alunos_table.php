<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("CREATE TABLE IF NOT EXISTS professor_alunos (id BIGSERIAL PRIMARY KEY, professor_id BIGINT, aluno_id BIGINT, created_at TIMESTAMP, updated_at TIMESTAMP, UNIQUE(professor_id, aluno_id))");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS professor_alunos CASCADE");
    }
};
