<?php

namespace App\Models\Helpers;

use JsonSerializable;
use DateTime;

class Passagem implements JsonSerializable
{


    /**
     * @param Trecho[] $trechosIda
     *
     * @param Trecho[]|null $trechosVolta
     */
    public function __construct(
        private float $preco,
        private string $ciaAerea,
        private string $codOrigem,
        private string $codDestino,
        private DateTime $dataHoraSaidaIda,
        private DateTime $dataHoraChegadaIda,
        private string $duracaoIda,
        private array $trechosIda,
        private ?DateTime $dataHoraSaidaVolta = null,
        private ?DateTime $dataHoraChegadaVolta = null,
        private ?string $duracaoVolta = null,
        private ?array $trechosVolta = null,
        private bool $trocaAeroportoIda = false,
        private bool $trocaAeroportoVolta = false,
    ) {
    }

    private static function verificaTrocaAeroporto(array $trechos){
        if(!isset($trechos)){
            return;
        }
        $lastDestino = $trechos[0]->getCodOrigem();
        foreach($trechos as $trecho){
            $atual = $trecho->getCodOrigem();
            if($atual != $lastDestino){
                return true;
            }
            $lastDestino = $trecho->getCodDestino();
        }
        return false;
    }

    /**
     * @return Passagem[]
     */
    public static function fromResult(array $result): array
    {
        $dictionaries = $result['dictionaries'];
        $voos = $result['data'];
        $passagens = [];
        foreach ($voos as $voo) {
            $preco = $voo['price']['grandTotal'];
            $ida = $voo['itineraries'][0];
            $duracaoIda = $ida['duration'];
            $trechosIda = [];
            foreach ($ida['segments'] as $segment) {
                $trecho = self::mapVooToTrecho($segment, $dictionaries);
                $trechosIda[] = $trecho;
            }
            $cia = $trechosIda[0]->getCiaAerea();
            $codOrigem = $trechosIda[0]->getCodOrigem();
            $codDestino = end($trechosIda)->getCodDestino();
            $dataHoraSaidaIda = $trechosIda[0]->getDataHoraSaida();
            $dataHoraChegadaIda = end($trechosIda)->getDataHoraChegada();
            $volta = $voo['itineraries'][1] ?? null;
            if (isset($volta)) {
                $trechosVolta = [];
                foreach ($volta['segments'] as $segment) {
                    $trecho = self::mapVooToTrecho($segment, $dictionaries);
                    $trechosVolta[] = $trecho;
                }
                $duracaoVolta = $volta['duration'];
                $dataHoraSaidaVolta = $trechosVolta[0]->getDataHoraSaida();
                $dataHoraChegadaVolta = end($trechosVolta)->getDataHoraChegada();
                $passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda, $dataHoraSaidaVolta, $dataHoraChegadaVolta, $duracaoVolta, $trechosVolta,self::verificaTrocaAeroporto($trechosIda),self::verificaTrocaAeroporto($trechosVolta));
            } else {
                $passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda);
            }

            $passagens[] = $passagem;
        }
        return $passagens;
    }

    public function jsonSerialize(): mixed
    {
        $retorno =
            [
                "origem" => $this->codOrigem,
                "destino" => $this->codDestino,
                "ciaAerea" => $this->ciaAerea,
                "preco" => number_format($this->preco, 2, ",", "."),
                "ida" => [
                    "dataHoraSaida" => $this->dataHoraSaidaIda->format(DateTime::ATOM),
                    "dataHoraChegada" => $this->dataHoraChegadaIda->format(DateTime::ATOM),
                    "duracao" => $this->duracaoIda,
                    "trocaAeroporto" => $this->trocaAeroportoIda,
                    "trechos" => $this->trechosIda
                ]
            ];
        if (isset($this->trechosVolta)) {
            $retorno ['volta'] = [
                "dataHoraSaida" => $this->dataHoraSaidaVolta->format(DateTime::ATOM),
                "dataHoraChegada" => $this->dataHoraChegadaVolta->format(DateTime::ATOM),
                "duracao" => $this->duracaoVolta,
                "trocaAeroporto" => $this->trocaAeroportoVolta,
                "trechos" => $this->trechosVolta
            ];
        }
        return $retorno;
    }

    private static function mapVooToTrecho(array $segment, array $dictionaries): Trecho
    {
        $saida = new DateTime($segment['departure']['at']);
        $origem = $segment['departure']['iataCode'];
        $chegada = new DateTime($segment['arrival']['at']);
        $destino = $segment['arrival']['iataCode'];
        $number = $segment['number'];
        $cia = $segment['carrierCode'] . " - " . $dictionaries['carriers'][$segment['carrierCode']];
        $aeronave = $segment['aircraft']['code'] . " - " . $dictionaries['aircraft'][$segment['aircraft']['code']];
        $duracao = $segment['duration'];

        return new Trecho($saida, $chegada, $duracao, $origem, $destino, $number, $cia, $aeronave);
    }
}
