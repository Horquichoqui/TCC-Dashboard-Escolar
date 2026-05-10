<?php

namespace Database\Seeders;

use App\Models\Aluno;
use App\Models\Falta;
use Illuminate\Database\Seeder;

class FaltaSeeder extends Seeder
{
    public function run(): void
    {
        if (Falta::count() > 0) {
            return;
        }

        $alunos = Aluno::all();
        $bimestres = [1, 2, 3, 4];
        $diasLetivos = [50, 52, 48, 50];

        foreach ($alunos as $aluno) {
            foreach ($bimestres as $i => $bimestre) {
                $dias = $diasLetivos[$i];
                $faltas = rand(0, 8);

                $registros = [];
                for ($j = 1; $j <= $dias; $j++) {
                    $registros[] = [
                        'aluno_id'   => $aluno->id,
                        'data'       => now()->addDays($j),
                        'presente'   => rand(0, 100) > ($faltas * 10 / $dias),
                        'bimestre'   => $bimestre,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }

                Falta::insert($registros);
            }
        }
    }
}
