<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("
            CREATE TABLE IF NOT EXISTS cache (
                key VARCHAR(255) PRIMARY KEY,
                value TEXT,
                expiration BIGINT
            )
        ");

        \DB::statement("CREATE INDEX IF NOT EXISTS cache_expiration_index ON cache(expiration)");

        \DB::statement("
            CREATE TABLE IF NOT EXISTS cache_locks (
                key VARCHAR(255) PRIMARY KEY,
                owner VARCHAR(255),
                expiration BIGINT
            )
        ");

        \DB::statement("CREATE INDEX IF NOT EXISTS cache_locks_expiration_index ON cache_locks(expiration)");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS cache_locks CASCADE");
        \DB::statement("DROP TABLE IF EXISTS cache CASCADE");
    }
};
