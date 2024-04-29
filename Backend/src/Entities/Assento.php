<?php

namespace App\Entities;

class Assento{
    private string $codigo;
    private bool $ocupado;
    private ?Passageiro $passageiro;

    public function __construct(string $codigo)
    {
        $this->codigo = $codigo;
        $this->ocupado = false;
    }

    public function getCodigo(): string{
        return $this->codigo;
    }

    public function ocupar(): self{
        $this->ocupado = true;
        return $this;
    }

    public function desocupar():self{
        $this->ocupado = false;
        $this->passageiro = null;
        return $this;
    }
    
    public function estaOcupado(): bool{
        return $this->ocupado;
    }

    public function setPassageiro(Passageiro $passageiro): self{
        $this->passageiro = $passageiro;
        return $this;
    }
    public function getPassageiro(): Passageiro | null
    {
        return $this->passageiro ?? null;
    }
}