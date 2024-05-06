<?php

namespace App\Http\Resources;

use App\Models\CiaAerea;
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
            'id' => $this->id,
            'parcelas' => $this->parcelas,
            'ativa' => $this->ativa,
            'validade' => $this->validade,
            'plano' => $this->whenLoaded("plano", new PlanoResource($this->plano)),
            'formaPagamento' => $this->whenLoaded("formaPagamento", new FormaPagamentoResource($this->formaPagamento)),
            'cia' => $this->whenLoaded("ciaAerea", new CiaAereaResource($this->ciaAerea))
        ];
    }
}
