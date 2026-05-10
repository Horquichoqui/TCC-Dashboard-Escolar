<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'usuarios';

    protected $fillable = ['nome', 'email', 'senha', 'funcao'];
    protected $hidden = ['senha'];

    public function alunos()
    {
        return $this->hasMany(Aluno::class, 'usuario_id');
    }

    public function professorAlunos()
    {
        return $this->hasMany(ProfessorAluno::class, 'professor_id');
    }
}
