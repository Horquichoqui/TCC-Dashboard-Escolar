<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::statement('ALTER TABLE faltas ADD COLUMN IF NOT EXISTS bimestre INTEGER DEFAULT 1');
    }

    public function down(): void
    {
        Schema::statement('ALTER TABLE faltas DROP COLUMN IF EXISTS bimestre');
    }
};
