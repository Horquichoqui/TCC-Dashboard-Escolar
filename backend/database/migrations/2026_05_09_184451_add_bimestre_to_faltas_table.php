<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        \DB::statement('ALTER TABLE IF EXISTS faltas ADD COLUMN IF NOT EXISTS bimestre INTEGER DEFAULT 1');
    }

    public function down(): void
    {
        \DB::statement('ALTER TABLE IF EXISTS faltas DROP COLUMN IF EXISTS bimestre');
    }
};
