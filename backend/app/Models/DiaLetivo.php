<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiaLetivo extends Model
{
    protected $table = 'dias_letivos';

    protected $fillable = ['ano', 'bimestre', 'dias'];

    protected $casts = [
        'ano' => 'integer',
        'bimestre' => 'integer',
        'dias' => 'integer',
    ];
}
