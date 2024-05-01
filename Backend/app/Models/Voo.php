<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\CiaAerea;
use App\Models\Aeronave;

class Voo extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'numero',
        'aeronave',
        'cia_aerea',
        'cod_origem',
        'cod_destino',
        'hora_saida',
        'hora_chegada',
        'duracao'
    ];

    protected $table = 'voo';

    public function aeronave(): BelongsTo{
        return $this->belongsTo(Aeronave::class);
    }

    public function ciaAerea(): BelongsTo{
        return $this->belongsTo(CiaAerea::class);
    }
}
