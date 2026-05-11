<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('CREATE TABLE IF NOT EXISTS cache (
            key VARCHAR(255) PRIMARY KEY,
            value TEXT,
            expiration BIGINT
        )');

        Schema::statement('CREATE INDEX IF NOT EXISTS cache_expiration_index ON cache(expiration)');

        Schema::statement('CREATE TABLE IF NOT EXISTS cache_locks (
            key VARCHAR(255) PRIMARY KEY,
            owner VARCHAR(255),
            expiration BIGINT
        )');

        Schema::statement('CREATE INDEX IF NOT EXISTS cache_locks_expiration_index ON cache_locks(expiration)');
    }

    public function down(): void
    {
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }
};
