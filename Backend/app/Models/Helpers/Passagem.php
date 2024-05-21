<?php

namespace App\Models\Helpers;

use App\Models\CiaAerea;
use JsonSerializable;
use DateTime;
use Illuminate\Support\Facades\DB;

class Passagem implements JsonSerializable
{


    /**
     * @param Trecho[] $trechosIda
     *
     * @param Trecho[]|null $trechosVolta
     */

    private CiaAerea $cia;
    private string $link;

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
        $this->setLink();
        $this->setCia();
    }

    private function setCia(){
        $cia = $this->ciaAerea;
        $iata = substr($cia, 0, 2);
        $noBanco = CiaAerea::where('codigo_iata', $iata)->get()->first();
        $this->cia = $noBanco;
    }

    private function setLink()
    {
        $cia = $this->ciaAerea;
        $iata = substr($cia, 0, 2);
        $noBanco = CiaAerea::where('codigo_iata', $iata)->get()->first();
        if ($noBanco) {
            $url = $noBanco->url;
        }

        $parts = parse_url($url);
        parse_str($parts['query'], $params);
        $link = match ($iata) {
            'G3' => $this->getGolUrl($params),
            'LA' => $this->getTamUrl($params),
            'AD' => $this->getAzulUrl()
        };
        $this->link = $link;
    }

    private function getGolUrl(array $params): string
    {
        //https://b2c.voegol.com.br/compra/busca-parceiros?pv=br&tipo=DF&de=JDO&para=EZE&ida=23-05-2024&volta=26-06-2024&ADT=1&ADL=0&CHD=0&INF=0
        $base = 'https://b2c.voegol.com.br/compra/busca-parceiros?';
        $params['de'] = $this->codOrigem;
        $params['para'] = $this->codDestino;
        $params['ida'] = $this->dataHoraSaidaIda->format("d-m-Y");
        if (!$this->dataHoraSaidaVolta) {
            unset($params['volta']);
        } else {
            $params['volta'] = $this->dataHoraSaidaVolta->format("d-m-Y");
        }

        return $base . $this->getQueryParamString($params);
    }
    private function getAzulUrl(): string
    {
        /**
         *
         * https://www.voeazul.com.br/br/pt/home/selecao-voo?
         * c[0].ds=JDO&
         * c[0].std=06/06/2024&
         * c[0].as=GRU&
         * c[1].ds=GRU&
         * c[1].std=06/11/2024&
         * c[1].as=JDO&
         * p[0].t=ADT&
         * p[0].c=1&
         * p[0].cp=false&
         * f.dl=3&
         * f.dr=3&
         * cc=BRL
         */
        $base = 'https://www.voeazul.com.br/br/pt/home/selecao-voo?';
        $params = [];
        $params['c'] = [];
        $ida = ["ds" => $this->codOrigem, 'as' => $this->codDestino, 'std' => $this->dataHoraSaidaIda->format("m/d/Y")];
        $params['c'][] = $ida;
        if ($this->dataHoraSaidaVolta) {
            $volta = ['ds' => $this->codDestino, 'as' => $this->codOrigem, 'std' => $this->dataHoraSaidaVolta->format("m/d/Y")];
            $params['c'][] = $volta;
        }
        $params['cc'] = 'BRL';
        $params['p'] = [['t' => 'ADT', 'cp' => 'false', 'c' => '1']];
        $params['f.dl'] = '3';
        $params['f.dr'] = '3';
        $queryParams = [];
        foreach ($params as $key => $value) {
            if (is_array($value)) {
                if (array_is_list($value)) {
                    foreach ($value as $index => $valor) {
                        foreach ($valor as $key2 => $value2) {
                            $str = $key . "[" . $index . "]." . $key2 . "=" . $value2;
                            $queryParams[] = $str;
                        }
                    }
                } else{
                    foreach ($value as $key2 => $value2) {
                        $queryParams[] = $key2 . "=" . $value2;
                    }
                }
            } else{
                $queryParams[] = $key . "=" . $value;
            }
        }
        return $base . implode("&", $queryParams);
    }
    private function getTamUrl(array $params): string
    {
        //https://www.latamairlines.com/br/pt/oferta-voos?origin=JDO&inbound=2024-06-21T12%3A00%3A00.000Z&outbound=2024-06-15T12%3A00%3A00.000Z&destination=FOR&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=RECOMMENDED
        $base = 'https://www.latamairlines.com/br/pt/oferta-voos?';
        $params['origin'] = $this->codOrigem;
        $params['destination'] = $this->codDestino;
        $params['outbound'] = $this->dataHoraSaidaIda->format(DateTime::ATOM);
        if (!$this->dataHoraSaidaVolta) {
            $params['trip'] = 'OW';
        }
        $params['inbound'] = $this->dataHoraSaidaVolta?->format(DateTime::ATOM) ?? 'null';

        return $base . $this->getQueryParamString($params);
    }

    private function getQueryParamString(array $params)
    {
        $urlParams = [];
        foreach ($params as $key => $value) {
            $urlParams[] = "{$key}={$value}";
        }
        return implode("&", $urlParams);
    }

    private static function verificaTrocaAeroporto(array $trechos)
    {
        if (!isset($trechos)) {
            return;
        }
        $lastDestino = $trechos[0]->getCodOrigem();
        foreach ($trechos as $trecho) {
            $atual = $trecho->getCodOrigem();
            if ($atual != $lastDestino) {
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
                $passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda, $dataHoraSaidaVolta, $dataHoraChegadaVolta, $duracaoVolta, $trechosVolta, self::verificaTrocaAeroporto($trechosIda), self::verificaTrocaAeroporto($trechosVolta));
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
                "cia" => $this->cia ?? null,
                "preco" => number_format($this->preco, 2, ",", "."),
                "linkBusca" => $this->link ?? '',
                "ida" => [
                    "dataHoraSaida" => $this->dataHoraSaidaIda->format(DateTime::ATOM),
                    "dataHoraChegada" => $this->dataHoraChegadaIda->format(DateTime::ATOM),
                    "duracao" => $this->duracaoIda,
                    "trocaAeroporto" => $this->trocaAeroportoIda,
                    "trechos" => $this->trechosIda
                ]
            ];
        if (isset($this->trechosVolta)) {
            $retorno['volta'] = [
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
