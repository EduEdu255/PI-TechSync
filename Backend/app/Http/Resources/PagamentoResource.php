<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PagamentoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'assinatura' => new AssinaturaResource($this->assinatura),
            'valor' => $this->valor,
            'formaPagamento' => new FormaPagamentoResource($this->formaPagamento),
            'detalhe' => $this->detalhe_forma_pagamento,
        ];
    }
}
