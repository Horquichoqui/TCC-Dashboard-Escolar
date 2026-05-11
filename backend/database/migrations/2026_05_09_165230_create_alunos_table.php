<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('CREATE TABLE IF NOT EXISTS alunos (
            id BIGSERIAL PRIMARY KEY,
            nome VARCHAR(255),
            matricula VARCHAR(255) UNIQUE,
            email VARCHAR(255),
            telefone VARCHAR(255),
            turma VARCHAR(255),
            usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )');

        DB::statement('CREATE INDEX IF NOT EXISTS alunos_usuario_id_index ON alunos(usuario_id)');
    }

    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
