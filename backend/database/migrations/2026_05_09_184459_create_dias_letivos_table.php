<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("
            CREATE TABLE IF NOT EXISTS dias_letivos (
                id BIGSERIAL PRIMARY KEY,
                ano SMALLINT,
                bimestre INTEGER,
                dias INTEGER,
                created_at TIMESTAMP,
                updated_at TIMESTAMP,
                UNIQUE(ano, bimestre)
            )
        ");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS dias_letivos CASCADE");
    }
};
