<?php

namespace App\Entities;

class Busca{
    private string $iataOrigem;
    private string $iataDestino;
    private \DateTime $dataSaida;
    private ?\DateTime $dataRetorno;
    private bool $datasFlexiveis;

    public function __construct(string $iataOrigem, string  $iataDestino, DateTime $dataSaida, bool $datasFlexiveis, ?Datetime $dataRetorno = null)
    {
        $this->iataOrigem = $iataOrigem;
        $this->iataDestino = $iataDestino;
        $this->dataSaida = $dataSaida;
        $this->datasFlexiveis  = $datasFlexiveis;
        $this->dataRetorno = $dataRetorno;
    }

    public function realizarBusca(): array{
        /**
         * Comunicação com API para buscar voos com os parâmetros solicitados
         */
    }
}