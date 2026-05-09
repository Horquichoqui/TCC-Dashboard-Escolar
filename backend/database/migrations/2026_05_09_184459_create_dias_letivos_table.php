<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dias_letivos', function (Blueprint $table) {
            $table->id();
            $table->year('ano');
            $table->integer('bimestre')->comment('1, 2, 3 ou 4');
            $table->integer('dias')->comment('Quantidade de dias letivos no bimestre');
            $table->timestamps();
            $table->unique(['ano', 'bimestre']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dias_letivos');
    }
};
