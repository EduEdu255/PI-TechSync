<?php

namespace App\Http\Resources;

use App\Http\Requests\AssinaturaRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CiaAereaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            '@type' => 'CiaAerea',
            'id' => $this->id,
            'razaoSocial' => $this->razao_social,
            'nomeFantasia' => $this->nome_fantasia,
            'login' => $this->login,
            'codigoIata' => $this->codigo_iata,
            'url' => $this->url,
            'logo' => $this->logo ?? '',
            'assinatura' => $this->assinatura,
        ];
    }
}
