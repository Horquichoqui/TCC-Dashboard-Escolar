<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('dias_letivos')) {
            Schema::create('dias_letivos', function (Blueprint $table) {
                $table->id();
                $table->year('ano');
                $table->integer('bimestre');
                $table->integer('dias');
                $table->timestamps();
                $table->unique(['ano', 'bimestre']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('dias_letivos');
    }
};
