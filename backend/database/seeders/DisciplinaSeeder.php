<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use Illuminate\Database\Seeder;

class DisciplinaSeeder extends Seeder
{
    public function run(): void
    {
        $disciplinas = [
            ['nome' => 'Matemática',       'descricao' => 'Disciplina de matemática'],
            ['nome' => 'Português',         'descricao' => 'Disciplina de língua portuguesa'],
            ['nome' => 'Ciências',          'descricao' => 'Disciplina de ciências naturais'],
            ['nome' => 'História',          'descricao' => 'Disciplina de história'],
            ['nome' => 'Geografia',         'descricao' => 'Disciplina de geografia'],
            ['nome' => 'Educação Física',   'descricao' => 'Disciplina de educação física'],
        ];

        foreach ($disciplinas as $data) {
            Disciplina::firstOrCreate(
                ['nome' => $data['nome']],
                $data
            );
        }
    }
}
