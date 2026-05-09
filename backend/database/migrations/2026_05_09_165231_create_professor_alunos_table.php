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
        Schema::create('professor_alunos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('professor_id')->references('id')->on('usuarios')->onDelete('cascade');
            $table->foreignId('aluno_id')->references('id')->on('alunos')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['professor_id', 'aluno_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professor_alunos');
    }
};
