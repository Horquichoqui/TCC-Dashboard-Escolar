<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('alunos')) {
            Schema::create('alunos', function (Blueprint $table) {
                $table->id();
                $table->string('nome');
                $table->string('matricula')->unique();
                $table->string('email')->nullable();
                $table->string('telefone')->nullable();
                $table->string('turma');
                $table->foreignId('usuario_id')->nullable()->references('id')->on('usuarios')->onDelete('set null');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('alunos');
    }
};
