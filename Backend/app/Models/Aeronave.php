<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aeronave extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'sigla',
        'marca',
        'qte_assentos'
    ];

    protected $table = 'aeronave';

    public function voos(): HasMany{
        return $this->hasMany(Voo::class);
    }
}
