<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plano extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'nome',
        'valor',
        'meses'
    ];

    protected $table = 'plano';

    public function assinaturas(): HasMany
    {
        return $this->hasMany(Assinatura::class);
    }
}
