<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiaLetivoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $diasLetivos = [
            ['ano' => 2026, 'bimestre' => 1, 'dias' => 50],
            ['ano' => 2026, 'bimestre' => 2, 'dias' => 52],
            ['ano' => 2026, 'bimestre' => 3, 'dias' => 48],
            ['ano' => 2026, 'bimestre' => 4, 'dias' => 50],
        ];

        foreach ($diasLetivos as $dia) {
            \App\Models\DiaLetivo::updateOrCreate(
                ['ano' => $dia['ano'], 'bimestre' => $dia['bimestre']],
                ['dias' => $dia['dias']]
            );
        }
    }
}
