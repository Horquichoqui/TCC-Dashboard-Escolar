<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("
            CREATE TABLE IF NOT EXISTS notas (
                id BIGSERIAL PRIMARY KEY,
                aluno_id BIGINT,
                disciplina_id BIGINT,
                valor_nota NUMERIC(5, 2),
                semestre INTEGER DEFAULT 1,
                created_at TIMESTAMP,
                updated_at TIMESTAMP
            )
        ");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS notas CASCADE");
    }
};
