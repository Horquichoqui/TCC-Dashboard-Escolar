<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Disciplina extends Model
{
    use HasFactory;

    protected $table = 'disciplinas';

    protected $fillable = ['nome', 'descricao'];

    public function notas()
    {
        return $this->hasMany(Nota::class, 'disciplina_id');
    }
}
