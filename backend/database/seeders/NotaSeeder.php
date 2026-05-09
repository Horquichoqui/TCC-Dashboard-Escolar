<?php

namespace Database\Seeders;

use App\Models\Nota;
use Illuminate\Database\Seeder;

class NotaSeeder extends Seeder
{
    public function run(): void
    {
        $notas = [
            ['aluno_id' => 1, 'disciplina_id' => 1, 'valor_nota' => 8.5, 'semestre' => 1],
            ['aluno_id' => 1, 'disciplina_id' => 2, 'valor_nota' => 7.0, 'semestre' => 1],
            ['aluno_id' => 1, 'disciplina_id' => 3, 'valor_nota' => 9.0, 'semestre' => 1],
            ['aluno_id' => 2, 'disciplina_id' => 1, 'valor_nota' => 6.5, 'semestre' => 1],
            ['aluno_id' => 2, 'disciplina_id' => 2, 'valor_nota' => 8.0, 'semestre' => 1],
            ['aluno_id' => 2, 'disciplina_id' => 3, 'valor_nota' => 7.5, 'semestre' => 1],
            ['aluno_id' => 3, 'disciplina_id' => 1, 'valor_nota' => 5.5, 'semestre' => 1],
            ['aluno_id' => 3, 'disciplina_id' => 2, 'valor_nota' => 6.0, 'semestre' => 1],
            ['aluno_id' => 3, 'disciplina_id' => 3, 'valor_nota' => 5.0, 'semestre' => 1],
            ['aluno_id' => 4, 'disciplina_id' => 1, 'valor_nota' => 9.5, 'semestre' => 1],
            ['aluno_id' => 4, 'disciplina_id' => 2, 'valor_nota' => 9.0, 'semestre' => 1],
            ['aluno_id' => 4, 'disciplina_id' => 3, 'valor_nota' => 8.5, 'semestre' => 1],
        ];

        foreach ($notas as $nota) {
            Nota::create($nota);
        }
    }
}
