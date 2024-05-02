<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pagamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'assinatura',
        'forma_pagamento',
        'valor',
        'detalhe_forma_pagamento'
    ];

    protected $table = 'pagamento';

    public function formaPagamento(): BelongsTo{
        return $this->belongsTo(FormaPagamento::class);
    }
    public function assinatura(): BelongsTo{
        return $this->belongsTo(Assinatura::class);
    }
}
