<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "nome" => $this->nome,
            "email" => $this->email,
            "nascimento" => $this->whenHas($this->nascimento, $this->nascimento),
            "telefone" => $this->telefone ?? '',
            "cpf" => $this->cpf ?? '',
            "logradouro" => $this->logradouro ?? '',
            "numero" => $this->numero ?? '',
            "complemento" => $this->complemento ?? '',
            "municipio" => $this->municipio ?? '',
            "uf" => $this->uf ?? ''
        ];
    }
}
