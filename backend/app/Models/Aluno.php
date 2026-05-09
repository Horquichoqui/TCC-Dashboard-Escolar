<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Aluno extends Model
{
    use HasFactory;

    protected $table = 'alunos';

    protected $fillable = ['nome', 'matricula', 'email', 'telefone', 'turma', 'usuario_id'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function notas()
    {
        return $this->hasMany(Nota::class, 'aluno_id');
    }

    public function faltas()
    {
        return $this->hasMany(Falta::class, 'aluno_id');
    }

    public function professores()
    {
        return $this->belongsToMany(Usuario::class, 'professor_alunos', 'aluno_id', 'professor_id');
    }
}
