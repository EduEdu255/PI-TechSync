<?php

namespace App\Entities;

class Passagem{
    private float $valor;
    private Passageiro $passageiro;
    private array $trechos;
    private CiaAerea $ciaAerea;
    private Usuario $comprador;

    public function __construct(Usuario $comprador, float $valor, Passageiro $passageiro, CiaAerea $ciaAerea)
    {
        $this->valor = $valor;
        $this->passageiro = $passageiro;
        $this->ciaAerea = $ciaAerea;
        $this->comprador = $comprador;
        $this->trechos = [];
    }

    public function getValor(): float
    {
        return $this->valor;
    }
    public function getPassageiro(): Passageiro
    {
        return $this->passageiro;
    }
    public function getTrechos(): array{
        return $this->trechos;
    }
    public function addTrecho(Trecho $trecho){
        $this->trechos[] = $trecho;
    }
    public function getCiaAerea(){
        return $this->ciaAerea;
    }


}