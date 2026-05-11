<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement("CREATE TABLE IF NOT EXISTS personal_access_tokens (id BIGSERIAL PRIMARY KEY, tokenable_type VARCHAR(255), tokenable_id BIGINT, name TEXT, token VARCHAR(64) UNIQUE, abilities TEXT, last_used_at TIMESTAMP, expires_at TIMESTAMP, created_at TIMESTAMP, updated_at TIMESTAMP)");
    }

    public function down(): void
    {
        \DB::statement("DROP TABLE IF EXISTS personal_access_tokens CASCADE");
    }
};
