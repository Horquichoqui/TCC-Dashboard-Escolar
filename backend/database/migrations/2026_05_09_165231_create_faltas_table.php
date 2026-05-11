<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("CREATE TABLE IF NOT EXISTS faltas (id BIGSERIAL PRIMARY KEY, aluno_id BIGINT, data DATE, presente BOOLEAN DEFAULT true, bimestre INTEGER DEFAULT 1, created_at TIMESTAMP, updated_at TIMESTAMP)");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS faltas CASCADE");
    }
};
