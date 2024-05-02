<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssinaturaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'parcelas' => $this->parcelas,
            'ativa' => $this->ativa,
            'validade' => $this->validade,
            'tipoAssinatura' => $this->whenLoaded("tipoAssinatura"),
            'formaPagamento' => $this->whenLoaded("formaPagamento"),
            'cia' => $this->whenLoaded("ciaAerea")
        ];
    }
}
