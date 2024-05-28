<?php

namespace App\Models\Helpers;

use ValueError;
use JsonSerializable;
use Illuminate\Support\Facades\DB;
use DateTime;
use App\Models\Voo;
use App\Models\CiaAerea;
use App\Models\Busca;
use DateInterval;

class Viagem implements JsonSerializable
{


    private string $link;
    private string $codOrigem;
    private string $codDestino;
    private DateTime $dataIda;
    private ?DateTime $dataVolta;

    public function __construct(
        private Busca $busca,
        private float $preco,
        private CiaAerea $ciaAerea,
        private PassagemLocal $ida,
        private ?PassagemLocal $volta = null

    ) {
        $this->codOrigem = $busca->origem;
        $this->codDestino = $busca->destino;
        $this->dataIda = new \DateTime($busca->data_saida);
        if($busca->data_chegada){
            $this->dataVolta = new \DateTime($busca->data_chegada);
        }
        $this->setLink();
    }


    public function getPreco()
    {
        return $this->preco ?? 0;
    }

    public function getCiaAerea()
    {
        return $this->ciaAerea;
    }

    private function setLink()
    {
        $cia = $this->ciaAerea;
        $url = $cia->url;
        $iata = $cia->codigo_iata;
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
        $params['ida'] = $this->dataIda->format("d-m-Y");
        if (!$this->busca->data_chegada) {
            unset($params['volta']);
        } else {
            $params['volta'] = (new DateTime($this->busca->data_chegada))->format("d-m-Y");
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
        $ida = ["ds" => $this->codOrigem, 'as' => $this->codDestino, 'std' => (new DateTime($this->busca->data_saida))->format("m/d/Y")];
        $params['c'][] = $ida;
        if ($this->busca->data_chegada) {
            $volta = ['ds' => $this->codDestino, 'as' => $this->codOrigem, 'std' => (new DateTime($this->busca->data_chegada))->format("m/d/Y")];
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
                } else {
                    foreach ($value as $key2 => $value2) {
                        $queryParams[] = $key2 . "=" . $value2;
                    }
                }
            } else {
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
        $params['outbound'] = $this->dataIda->format(DateTime::ATOM);
        if (!$this->busca->data_chegada) {
            $params['trip'] = 'OW';
        } else {
            try {
                $params['inbound'] = (new DateTime($this->busca->data_chegada))->format(DateTime::ATOM);
            } catch (\Throwable $th) {
                $params['inbound'] = 'null';
            }
        }

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


    public function jsonSerialize(): mixed
    {
        $retorno =
            [
                "origem" => $this->codOrigem,
                "destino" => $this->codDestino,
                "ciaAerea" => $this->ciaAerea,
                "preco" => number_format($this->preco, 2, ",", "."),
                "linkBusca" => $this->link ?? '',
                "dataIda" => $this->dataIda->format("Y-m-d"),
                "dataVolta" => isset($this->dataVolta) ? $this->dataVolta->format("Y-m-d") : null,
                "ida" => $this->ida,
                "volta" => $this->volta,
            ];
        return $retorno;
    }
}
