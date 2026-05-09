<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UsuarioSeeder::class,
            AlunoSeeder::class,
            DisciplinaSeeder::class,
            NotaSeeder::class,
            DiaLetivoSeeder::class,
            FaltaSeeder::class,
        ]);
    }
}
