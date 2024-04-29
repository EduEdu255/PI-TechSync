<?php

namespace App\Entities;

class Aeronave{
    private string $sigla;
    private int $qteAssentos;
    private int $qteFileiras;
    private int $assentosPorFila;
    private int $assentosPrioritarios;

    public function __construct(string $sigla, int $qteFileiras, int $assentosPorFila, int $assentosPrioritarios)
    {
        $this->sigla = $sigla;
        $this->qteFileiras = $qteFileiras;
        $this->qteAssentos = $qteFileiras * $assentosPorFila;
        $this->assentosPorFila = $assentosPorFila;
        $this->assentosPrioritarios = $assentosPrioritarios;
    }

    public function gerarAssentos(): array{
        $assentos = [];
        for($i = 1; $i <= $this->qteFileiras; $i++){
            for($j = 0; $j < $this->assentosPorFila; $j++){
                $letra = chr($j + 65);
                $assento = new Assento("{$i}{$letra}");
                $assentos[] = $assento;
            }
        }
        return $assentos;
    }

    public function getAssentosFila(){
        return $this->assentosPorFila;
    }
    public function getQuantidadeFilas(){
        return $this->qteFileiras;
    }

}