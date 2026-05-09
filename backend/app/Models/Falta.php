<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Falta extends Model
{
    use HasFactory;

    protected $table = 'faltas';

    protected $fillable = ['aluno_id', 'data', 'presente', 'bimestre'];

    protected $casts = [
        'data' => 'date',
        'presente' => 'boolean',
    ];

    public function aluno()
    {
        return $this->belongsTo(Aluno::class, 'aluno_id');
    }
}
