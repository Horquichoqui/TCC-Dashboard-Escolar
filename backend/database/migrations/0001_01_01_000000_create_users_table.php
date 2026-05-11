<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('CREATE TABLE IF NOT EXISTS usuarios (
            id BIGSERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL,
            funcao VARCHAR(255) NOT NULL DEFAULT \'professor\',
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        )');

        DB::statement('CREATE TABLE IF NOT EXISTS password_reset_tokens (
            email VARCHAR(255) PRIMARY KEY,
            token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP
        )');

        DB::statement('CREATE TABLE IF NOT EXISTS sessions (
            id VARCHAR(255) PRIMARY KEY,
            usuario_id BIGINT REFERENCES usuarios(id) ON DELETE SET NULL,
            ip_address VARCHAR(45),
            user_agent TEXT,
            payload TEXT,
            last_activity INTEGER
        )');

        DB::statement('CREATE INDEX IF NOT EXISTS sessions_usuario_id_index ON sessions(usuario_id)');
        DB::statement('CREATE INDEX IF NOT EXISTS sessions_last_activity_index ON sessions(last_activity)');
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('usuarios');
    }
};
