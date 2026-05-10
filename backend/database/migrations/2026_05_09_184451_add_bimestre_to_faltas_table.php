<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('faltas') && !Schema::hasColumn('faltas', 'bimestre')) {
            Schema::table('faltas', function (Blueprint $table) {
                $table->integer('bimestre')->default(1)->after('presente');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('faltas', 'bimestre')) {
            Schema::table('faltas', function (Blueprint $table) {
                $table->dropColumn('bimestre');
            });
        }
    }
};
