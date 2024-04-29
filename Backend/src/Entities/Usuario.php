<?php

namespace App\Entities;

class Usuario extends Pessoa
{
    private string $senha;
    private string $logradouro;
    private string $numeroEndereco;
    private string $municipio;
    private string $uf;
    private \DateTimeImmutable $dataHoraCadastro;

    public function __construct(private string $email, string $nome)
    {
        $this->nome = $nome;
        $this->dataHoraCadastro = new \DateTimeImmutable();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setSenha(string $senha): self
    {
        $this->senha = $senha;
        return $this;
    }

    public function setCpf($cpf): self
    {
        $this->cpf = $cpf;

        return $this;
    }

    public function setTelefone(string $telefone): self
    {
        $this->telefone = $telefone;

        return $this;
    }


    public function getLogradouro(): string
    {
        return $this->logradouro;
    }

    public function setLogradouro(string $logradouro): self
    {
        $this->logradouro = $logradouro;
        return $this;
    }


    public function getNumeroEndereco(): string
    {
        return $this->numeroEndereco;
    }


    public function setNumeroEndereco(string $numeroEndereco): self
    {
        $this->numeroEndereco = $numeroEndereco;

        return $this;
    }

    public function getMunicipio(): string
    {
        return $this->municipio;
    }

    public function setMunicipio(string $municipio): self
    {
        $this->municipio = $municipio;

        return $this;
    }

    public function getUf(): string
    {
        return $this->uf;
    }

    public function setUf(string $uf): self
    {
        if (strlen($uf != 2)) {
            throw new \ValueError("Informe sigla do estado da federação com 2 letras");
        }
        $this->uf = mb_strtoupper($uf);
        return $this;
    }

    public function getDataHoraCadastro(): \DateTimeImmutable
    {
        return $this->dataHoraCadastro;
    }

    public function setDataHoraCadastro(\DateTimeImmutable $dataHoraCadastro): self
    {
        $this->dataHoraCadastro = $dataHoraCadastro;
        return $this;
    }

    public function comprarPassagem(float $valor, Passageiro $passageiro, array $voos, CiaAerea $ciaAerea): Passagem
    {

        $passagem = new Passagem($this, $valor, $passageiro, $ciaAerea);
        foreach ($voos as $voo) {
            $trecho = new Trecho($voo, $passagem);
            $passagem->addTrecho($trecho);
        }
        return $passagem;
    }

    public function marcarAssento(Passageiro $passageiro, $codigoAssento, Trecho $trecho){
        $trecho->marcarAssento($codigoAssento, $passageiro);
    }
}
