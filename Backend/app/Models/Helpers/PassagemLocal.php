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

class PassagemLocal implements JsonSerializable
{


    /**
     * @param Trecho[] $trechosIda
     *
     */

    private string $link;

    public function __construct(
        private float $preco,
        private CiaAerea $ciaAerea,
        private string $codOrigem,
        private string $codDestino,
        private DateTime $dataHoraSaida,
        private DateTime $dataHoraChegada,
        private string $duracao,
        private array $trechos,
        private Busca $busca,
    ) {
        $this->setLink();
    }
    public function getPreco(){
        return $this->preco ?? 0;
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
        $params['ida'] = $this->dataHoraSaida->format("d-m-Y");
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
        $params['outbound'] = $this->dataHoraSaida->format(DateTime::ATOM);
        if (!$this->busca->data_chegada) {
            $params['trip'] = 'OW';
        } else {
            try{
                $params['inbound'] = (new DateTime($this->busca->data_chegada))->format(DateTime::ATOM);
            } catch (\Throwable $th){
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

    private static function calculateDuracao(string $saida, string $chegada)
    {
        $timeSaida = explode(":", $saida);
        $timeChegada = explode(":", $chegada);
        $dataSaida = (new \DateTime())->setTime($timeSaida[0], $timeSaida[1]);
        $dataChegada = (new \DateTime())->setTime($timeChegada[0], $timeChegada[1]);
        //Se a chegada é antes da saída, então chega no dia seguinte
        if ($dataSaida > $dataChegada) {
            $dataChegada->add(new \DateInterval("P1D"));
        }

        $intevalo = $dataSaida->diff($dataChegada);
        if ($intevalo) {
            //Retorna o intervalo de tempo em total de minutos
            return (new \DateTime())->setTimestamp(0)->add($intevalo)->getTimestamp() / 60;
        }
        throw new ValueError("Não foi possível obter um intervalo entre hora de saída e hora de chegada");
    }

    private static function durationAsInterval(int $duration): string
    {
        $minutos = $duration % 60;
        $horas =  (int) ($duration /60);
        $interval = "PT";
        if ($horas) {
            $interval .= "{$horas}H";
        }
        if ($minutos > 0) {
            $interval .= "{$minutos}M";
        }
        return $interval;
    }

    public static function fromBusca(Busca $busca, array $idas, array $voltas = []): array
    {
        $passagensIda = [];
        $passagensVolta = [];
        
        foreach ($idas as $ida) {
            $dataSaida = new DateTime($busca->data_saida);
            $dataChegada = new DateTime($busca->data_saida);
            $trechosida = array_map('self::mapVooLocalToTrecho', $ida);
            $valor = array_reduce($ida, fn ($carry, $tr) => $carry + $tr->valor, 0);
            $duration = self::calculateDuracao($ida[0]->hora_saida, $ida[count($ida) - 1]->hora_chegada);
            $duration = self::durationAsInterval($duration);
            $origem = $busca->origem;
            $destino = $busca->destino;
            $cia = $ida[0]->ciaAerea;
            [$horaSaida, $minutoSaida] = explode(":", $ida[0]->hora_saida);
            [$horaChegada, $minutoChegada] = explode(":", $ida[count($ida) - 1]->hora_chegada);
            $dataSaida->setTime($horaSaida, $minutoSaida);
            $dataChegada->setTime($horaChegada, $minutoChegada);
            if ($dataChegada < $dataSaida) {
                $dataChegada->add(DateInterval::createFromDateString('1 day'));
            }
            $passagem = new PassagemLocal($valor, $cia, $origem, $destino, $dataSaida, $dataChegada, $duration, $trechosida, $busca);
            $passagensIda[] = $passagem;
            //$passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda)
        }
        if ($busca->data_chegada) {
            foreach ($voltas as $volta) {
                $dataSaida = new DateTime($busca->data_chegada);
                $dataChegada = new DateTime($busca->data_chegada);
                $trechosVolta =
                array_map('self::mapVooLocalToTrecho', $volta);
                $valor = array_reduce($volta, fn ($carry, $tr) => $carry + $tr->valor, 0);
                $duration = self::calculateDuracao($volta[0]->hora_saida, $volta[count($volta) - 1]->hora_chegada);
                $duration = self::durationAsInterval($duration);
                $origem = $busca->origem;
                $destino = $busca->destino;
                $cia = $volta[0]->ciaAerea;
                [$horaSaida, $minutoSaida] = explode(":", $volta[0]->hora_saida);
                [$horaChegada, $minutoChegada] = explode(":", $volta[count($volta) - 1]->hora_chegada);
                $dataSaida->setTime($horaSaida, $minutoSaida);
                $dataChegada->setTime($horaChegada, $minutoChegada);
                if ($dataChegada < $dataSaida) {
                    $dataChegada->add(DateInterval::createFromDateString('1 day'));
                }
                $passagem = new PassagemLocal($valor, $cia, $origem, $destino, $dataSaida, $dataChegada, $duration, $trechosVolta, $busca);
                $passagensVolta[] = $passagem;
                //$passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda)
            }
        }
        usort($passagensIda, fn(PassagemLocal $passagem1, PassagemLocal $passagem2) => $passagem1->getPreco() > $passagem2->getPreco());
        usort($passagensVolta, fn(PassagemLocal $passagem1, PassagemLocal $passagem2) => $passagem1->getPreco() > $passagem2->getPreco());
        return ["ida" => $passagensIda, "volta" => $passagensVolta];
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
                "dataHoraSaida" => $this->dataHoraSaida->format(DateTime::ATOM),
                "dataHoraChegada" => $this->dataHoraChegada->format(DateTime::ATOM),
                "duracao" => $this->duracao,
                "trocaAeroporto" => false,
                "trechos" => $this->trechos
            ];
        return $retorno;
    }

    private static function mapVooLocalToTrecho(Voo $voo)
    {
        $timeSaida = explode(":", $voo->hora_saida);
        $timeChegada = explode(":", $voo->hora_chegada);
        $dataSaida = (new \DateTime())->setTime($timeSaida[0], $timeSaida[1]);
        $dataChegada = (new \DateTime())->setTime($timeChegada[0], $timeChegada[1]);
        $origem = $voo->cod_origem;
        $destino = $voo->cod_destino;
        $numero = $voo->numero;
        $cia = $voo->ciaAerea->codigo_iata . " - " . $voo->ciaAerea->razao_social;
        $aeronave = $voo->aeronave->sigla . " - " . $voo->aeronave->marca;
        $duracao = self::durationAsInterval($voo->duracao);
        return new Trecho($dataSaida, $dataChegada, $duracao, $origem, $destino, $numero, $cia, $aeronave);
    }
}
