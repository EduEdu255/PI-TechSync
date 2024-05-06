<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormaPagamento extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = [
        'nome',
        'parcelas'
    ];

    protected $table = 'forma_pagamento';

    public function assinaturas(): HasMany
    {
        return $this->hasMany(Assinatura::class);
    }
}
