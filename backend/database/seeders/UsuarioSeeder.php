<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = [
            [
                'nome' => 'Administrador',
                'email' => 'admin@dashboard.com',
                'senha' => Hash::make('password123'),
                'funcao' => 'admin',
            ],
            [
                'nome' => 'Professor João',
                'email' => 'joao@dashboard.com',
                'senha' => Hash::make('password123'),
                'funcao' => 'professor',
            ],
            [
                'nome' => 'Professor Maria',
                'email' => 'maria@dashboard.com',
                'senha' => Hash::make('password123'),
                'funcao' => 'professor',
            ],
        ];

        foreach ($usuarios as $data) {
            Usuario::firstOrCreate(
                ['email' => $data['email']],
                $data
            );
        }
    }
}
