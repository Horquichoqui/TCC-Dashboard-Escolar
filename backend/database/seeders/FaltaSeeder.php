<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaltaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alunos = \App\Models\Aluno::all();
        $bimestres = [1, 2, 3, 4];
        $diasLetivos = [50, 52, 48, 50];

        foreach ($alunos as $aluno) {
            foreach ($bimestres as $i => $bimestre) {
                $dias = $diasLetivos[$i];
                $faltas = rand(0, 8);

                $datas = [];
                for ($j = 1; $j <= $dias; $j++) {
                    $datas[] = [
                        'aluno_id' => $aluno->id,
                        'data' => now()->addDays($j),
                        'presente' => rand(0, 100) > ($faltas * 10 / $dias),
                        'bimestre' => $bimestre,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                \App\Models\Falta::insert($datas);
            }
        }
    }
}
