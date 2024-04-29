<?php

namespace App\Entities;

class CiaAerea
{
    private string $razaoSocial;
    private string $cnpj;
    private ?string $telefone;
    private ?string $email;
    private string $codigoIata;

    public function __construct(string $razaoSocial, string $cpnj, string $codigoIata)
    {
        $this->razaoSocial = $razaoSocial;
        $this->cnpj = $cpnj;
        $this->codigoIata = $codigoIata;
    }

    public function getRazaoSocial(): string
    {
        return $this->razaoSocial;
    }

    public function getCnpj(): string
    {
        return $this->cnpj;
    }
    public function getCodigoIata(): string
    {
        return $this->codigoIata;
    }
    public function setTelefone(string $telefone): self
    {
        $this->telefone = $telefone;
        return $this;
    }
    public function getTelefone(): string
    {
        return $this->telefone;
    }
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }
    public function getEmail(): string
    {
        return $this->email;
    }
}
