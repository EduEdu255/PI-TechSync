<?php

namespace App\Models\Helpers;

use App\Models\CiaAerea;
use JsonSerializable;
use DateTime;

class Trecho implements JsonSerializable
{
    private bool $proximoDia = false;
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
    ) {}

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
    public function getProximoDia():bool
    {
        return $this->proximoDia;
    }
    public function setProximoDia(bool $proximoDia): static{
        $this->proximoDia = $proximoDia;
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
            "proximoDia" => $this->proximoDia,
            "espera" => $this->espera
        ];
    }
}
