<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('CREATE TABLE IF NOT EXISTS professor_alunos (
            id BIGSERIAL PRIMARY KEY,
            professor_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
            aluno_id BIGINT REFERENCES alunos(id) ON DELETE CASCADE,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            UNIQUE(professor_id, aluno_id)
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('professor_alunos');
    }
};
