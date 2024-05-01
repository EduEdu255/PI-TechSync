<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assinatura extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'cia_aerea',
        'valor',
        'validade',
        'ativa'
    ];

    public function ciaAerea(): BelongsTo{
        return $this->belongsTo(CiaAerea::class);
    }
}
