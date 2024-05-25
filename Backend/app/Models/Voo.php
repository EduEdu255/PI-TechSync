<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\CiaAerea;
use App\Models\Aeronave;


class Voo extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'numero',
        'cod_origem',
        'cod_destino',
        'hora_saida',
        'hora_chegada',
        'duracao',
        'valor'
    ];

    protected $table = 'voo';

    public function aeronave(): BelongsTo{
        return $this->belongsTo(Aeronave::class);
    }

    public function ciaAerea(): BelongsTo{
        return $this->belongsTo(CiaAerea::class);
    }

    protected function horaSaida():Attribute{
        return Attribute::make(
            get: function (string $value) {
                $parts = explode(":", $value);
                $hour = str_pad($parts[0], 2, "0", STR_PAD_LEFT);
                $minute = str_pad($parts[1], 2, "0", STR_PAD_LEFT);;
                return $hour . ":" . $minute;
            }
        );
    }

    protected function horaChegada():Attribute{
        return Attribute::make(
            get: function (string $value) {
                $parts = explode(":", $value);
                $hour = str_pad($parts[0], 2, "0", STR_PAD_LEFT);
                $minute = str_pad($parts[1], 2, "0", STR_PAD_LEFT);;
                return $hour . ":" . $minute;
            }
        );
    }
}
