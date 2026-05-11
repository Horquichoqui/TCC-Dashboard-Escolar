<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS faltas (
            id BIGSERIAL PRIMARY KEY,
            aluno_id BIGINT REFERENCES alunos(id) ON DELETE CASCADE,
            data DATE,
            presente BOOLEAN DEFAULT true,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('faltas');
    }
};
