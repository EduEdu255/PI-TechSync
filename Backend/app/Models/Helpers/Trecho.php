<?php

namespace App\Models\Helpers;

use JsonSerializable;
use DateTime;

class Trecho implements JsonSerializable
{

    public function __construct(
        private DateTime $dataHoraSaida,
        private DateTime $dataHoraChegada,
        private string $duracao,
        private string $codOrigem,
        private string $codDestino,
        private string $numero,
        private string $cia,
        private string $aeronave
    ) {
    }

    public function getCodOrigem(){
        return $this->codOrigem;
    }
    public function getCodDestino(){
        return $this->codDestino;
    }
    public function getCiaAerea(){
        return $this->cia;
    }
    public function getDataHoraSaida(){
        return $this->dataHoraSaida;
    }
    public function getDataHoraChegada(){
        return $this->dataHoraChegada;
    }

    public function jsonSerialize(): mixed
    {
        return [
            "duracao" => $this->duracao,
            "origem" => $this->codOrigem,
            "destino" => $this->codDestino,
            "numero" => $this->numero,
            "dataHoraSaida" => $this->dataHoraSaida->format(DateTime::ATOM),
            "dataHoraChegada" => $this->dataHoraChegada->format(DateTime::ATOM),
            "ciaAerea" => $this->cia,
            "aeronave"=> $this->aeronave
        ];
    }
}
