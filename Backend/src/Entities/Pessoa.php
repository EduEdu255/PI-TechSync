<?php

namespace App\Entities;

abstract class Pessoa
{
    protected string $nome;
    protected string $cpf;
    protected string $telefone;

    public function getNome(): string
    {
        return $this->nome;
    }
    public function getCpf(): string
    {
        return $this->cpf;
    }
    public function getTelefone(): string
    {
        return $this->telefone;
    }
}
