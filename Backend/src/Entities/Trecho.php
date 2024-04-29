<?php

namespace App\Entities;

class Trecho{
    private Assento $assento;
    private Voo $voo;
    private Passagem $passagem;

    public function __construct(Voo $voo, Passagem $passagem)
    {
        $this->voo = $voo;
        $this->passagem = $passagem;
    }

    public function marcarAssento(string $codigo, Passageiro $passageiro){
        $this->voo->ocuparAssento($codigo, $passageiro);
    }
}