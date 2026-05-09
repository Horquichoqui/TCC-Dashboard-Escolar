<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProfessorAluno extends Model
{
    use HasFactory;

    protected $table = 'professor_alunos';

    protected $fillable = ['professor_id', 'aluno_id'];

    public function professor()
    {
        return $this->belongsTo(Usuario::class, 'professor_id');
    }

    public function aluno()
    {
        return $this->belongsTo(Aluno::class, 'aluno_id');
    }
}
