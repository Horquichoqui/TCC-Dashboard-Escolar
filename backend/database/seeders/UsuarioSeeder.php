<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::create([
            'nome' => 'Administrador',
            'email' => 'admin@dashboard.com',
            'senha' => Hash::make('password123'),
            'funcao' => 'admin'
        ]);

        Usuario::create([
            'nome' => 'Professor João',
            'email' => 'joao@dashboard.com',
            'senha' => Hash::make('password123'),
            'funcao' => 'professor'
        ]);

        Usuario::create([
            'nome' => 'Professor Maria',
            'email' => 'maria@dashboard.com',
            'senha' => Hash::make('password123'),
            'funcao' => 'professor'
        ]);
    }
}
