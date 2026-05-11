<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS disciplinas (
            id BIGSERIAL PRIMARY KEY,
            nome VARCHAR(255),
            descricao TEXT,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('disciplinas');
    }
};
