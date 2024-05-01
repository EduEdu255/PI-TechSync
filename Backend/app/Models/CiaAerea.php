<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CiaAerea extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'razao_social',
        'cnpj',
        'codigo_iata',
        'email',
        'url',
        'telefone',
        'login',
        'passowrd'
    ];

    protected $hidden = [
        'password',
        'login'
    ];

    public function voos():HasMany{
        return $this->hasMany(Voo::class);
    }
}
