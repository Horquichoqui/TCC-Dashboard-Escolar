<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS dias_letivos (
            id BIGSERIAL PRIMARY KEY,
            ano SMALLINT,
            bimestre INTEGER,
            dias INTEGER,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            UNIQUE(ano, bimestre)
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('dias_letivos');
    }
};
