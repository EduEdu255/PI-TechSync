<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class BuscaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $retorno =
         [
            'id' => $this->id,
            "origem" => $this->origem,
            "destino" => $this->destino,
            "pesquisado_em" => $this->pesquisado_em,
            "ida" => $this->data_saida,
            "reservou" => $this->reservou,
            "volta" => $this->whenHas('data_chegada', $this->data_chegada),
            "usuario" => $this->whenHas('users_id', new UserResource($this->users)),
            "passagens" => $this->whenHas('passagens', $this->passagens),
        ];
        if(isset($this->passagens)){
            $retorno['quantidade'] = count($this->passagens['ida']) + count($this->passagens['volta']);
        }
        return $retorno;
    }
}
