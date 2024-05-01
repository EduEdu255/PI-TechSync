<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VooResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'numero' => $this->numero,
            'aeronave' => $this->aeronave(),
            'ciaAerea' => $this->ciaAerea(),
            'origem' => $this->cod_origem,
            'destino' => $this->cod_destino,
            'saida' => $this->hora_saida,
            'chegada' => $this->hora_chegada,
            'duracao' => $this->duracao
        ];
    }
}