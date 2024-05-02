<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Busca extends Model
{
    use HasFactory;

    protected $fillable = [
        'origem',
        'destino',
        'user',
        'pesquisado_em',
        'data_saida',
        'data_chegada'
    ];

    protected $table = 'busca';

    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
