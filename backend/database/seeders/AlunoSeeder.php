<?php

namespace Database\Seeders;

use App\Models\Aluno;
use Illuminate\Database\Seeder;

class AlunoSeeder extends Seeder
{
    public function run(): void
    {
        $alunos = [
            ['nome' => 'Carlos Silva',      'matricula' => '001', 'email' => 'carlos@email.com',   'telefone' => '119999-0001', 'turma' => '1A'],
            ['nome' => 'Ana Paula',          'matricula' => '002', 'email' => 'ana@email.com',      'telefone' => '119999-0002', 'turma' => '1A'],
            ['nome' => 'Bruno Costa',        'matricula' => '003', 'email' => 'bruno@email.com',    'telefone' => '119999-0003', 'turma' => '1B'],
            ['nome' => 'Fernanda Oliveira',  'matricula' => '004', 'email' => 'fernanda@email.com', 'telefone' => '119999-0004', 'turma' => '1B'],
            ['nome' => 'Gabriel Pereira',    'matricula' => '005', 'email' => 'gabriel@email.com',  'telefone' => '119999-0005', 'turma' => '2A'],
            ['nome' => 'Juliana Mendes',     'matricula' => '006', 'email' => 'juliana@email.com',  'telefone' => '119999-0006', 'turma' => '2A'],
            ['nome' => 'Roberto Santos',     'matricula' => '007', 'email' => 'roberto@email.com',  'telefone' => '119999-0007', 'turma' => '2B'],
            ['nome' => 'Camila Rocha',       'matricula' => '008', 'email' => 'camila@email.com',   'telefone' => '119999-0008', 'turma' => '2B'],
        ];

        foreach ($alunos as $data) {
            Aluno::firstOrCreate(
                ['matricula' => $data['matricula']],
                $data
            );
        }
    }
}
