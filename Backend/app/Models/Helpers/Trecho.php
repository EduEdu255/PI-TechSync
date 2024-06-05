<?php

namespace App\Models\Helpers;

use App\Models\CiaAerea;
use JsonSerializable;
use DateTime;

class Trecho implements JsonSerializable
{
    private bool $proximoDiaSaida = false;
    private bool $proximoDiaChegada = false;
    private ?string $espera = null;
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
        $this->proximoDiaChegada = ($dataHoraSaida->format("d") < $dataHoraChegada->format("d"));
    }

    public function getCodOrigem(): string{
        return $this->codOrigem;
    }
    public function getCodDestino(): string{
        return $this->codDestino;
    }
    public function getCiaAerea(): string{
        return $this->cia;
    }
    public function getDataHoraSaida(): DateTime{
        return $this->dataHoraSaida;
    }
    public function getDataHoraChegada(): DateTime{
        return $this->dataHoraChegada;
    }
    public function setDataHoraSaida(DateTime $dataHoraSaida): static{
        $this->dataHoraSaida = $dataHoraSaida;
        return $this;
    }
    public function setDataHoraChegada(DateTime $dataHoraChegada): static{
        $this->dataHoraChegada = $dataHoraChegada;
        return $this;
    }
    public function getProximoDiaSaida():bool
    {
        return $this->proximoDiaSaida;
    }
    public function setProximoDiaSaida(bool $proximoDiaSaida): static{
        $this->proximoDiaSaida = $proximoDiaSaida;
        return $this;
    }

    public function getProximoDiaChegada():bool
    {
        return $this->proximoDiaChegada;
    }
    public function setProximoDiaChegada(bool $proximoDiaChegada): static{
        $this->proximoDiaChegada = $proximoDiaChegada;
        return $this;
    }
    public function setEspera(string $espera): static{
        $this->espera = $espera;
        return $this;
    }

    public function jsonSerialize(): mixed
    {
        return [
            "duracao" => $this->duracao,
            "origem" => $this->codOrigem,
            "destino" => $this->codDestino,
            "numero" => $this->numero,
            "horaSaida" => $this->dataHoraSaida->format("Y-m-d H:i:s"),
            "horaChegada" => $this->dataHoraChegada->format("Y-m-d H:i:s"),
            "ciaAerea" => $this->cia,
            "aeronave"=> $this->aeronave,
            "proximoDiaSaida" => $this->proximoDiaSaida,
            "proximoDiaChegada" => $this->proximoDiaChegada,
            "espera" => $this->espera
        ];
    }
}
