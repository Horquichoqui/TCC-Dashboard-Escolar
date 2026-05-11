<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS notas (
            id BIGSERIAL PRIMARY KEY,
            aluno_id BIGINT REFERENCES alunos(id) ON DELETE CASCADE,
            disciplina_id BIGINT REFERENCES disciplinas(id) ON DELETE CASCADE,
            valor_nota NUMERIC(5, 2),
            semestre INTEGER DEFAULT 1,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('notas');
    }
};
