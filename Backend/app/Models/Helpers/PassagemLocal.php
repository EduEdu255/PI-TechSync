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
     * @param Trecho[] $trechos
     *
     */

    private array $altaEstacao;
    private const variacaoAltaEstacao = 0.6;
    private const reducaoDataDistante = 0.3;
    private const aumentoDataProxima = 0.3;
    private const aumentoDataMuitoProxima = 1;

    private DateTime $dataHoraSaida;
    private DateTime $dataHoraChegada;
    private string $duracao;

    public function __construct(
        private float $preco,
        private CiaAerea $ciaAerea,
        private string $codOrigem,
        private string $codDestino,
        private array $trechos,
        private Busca $busca,
    ) {
        $this->setDates();
        if($this->dataHoraSaida < now()->setTime(0,0,0,0))
        {
            throw new ValueError("Não é possível criar passagem com data de saída no passado");
        }
        $this->altaEstacao = [
            ["inicio" => "0101", "fim" => "0131"],
            ["inicio" => "0701", "fim" => "0731"],
            ["inicio" => "1201", "fim" => "1231"]
        ];
        $this->preco = $this->preco * $this->calculaIndice();
    }

    private function setDates(){
        $this->dataHoraSaida = $this->trechos[0]->getDataHoraSaida();
        $this->dataHoraChegada = $this->trechos[count($this->trechos) - 1]->getDataHoraChegada();
        $this->duracao = self::durationAsInterval(self::calculateDuracaoDatas($this->dataHoraSaida, $this->dataHoraChegada));
    }

    public function getPreco()
    {
        return $this->preco ?? 0;
    }

    public function getCiaAerea()
    {
        return $this->ciaAerea;
    }
    public function getBusca()
    {
        return $this->busca;
    }

    //Função para calcular se haverá alteração do preço do voo com base na data
    private function calculaIndice()
    {
        $indice = 1;
        foreach ($this->altaEstacao as $periodo) {
            if ($this->dataHoraSaida->format("md") > $periodo['inicio'] && $this->dataHoraSaida->format("md") < $periodo['fim']) {
                $indice += self::variacaoAltaEstacao;
            }
        }

        $hoje = now();
        $difference = $hoje->diff($this->dataHoraSaida);
        //Se passagem é para depois de 180 dias, dar desconto
        if($difference->days >180){
            $indice -= self::reducaoDataDistante;
        }
        //Se a data for muito próxima (menos de 1 semana), aumenta consideravelmente
        else if($difference->days < 7){
            $indice += self::aumentoDataMuitoProxima;

        //Se a passagem é para data próxima (próximos 60 dias) aumentar preço
        } else if ($difference->days < 60){
            $indice += self::aumentoDataProxima;
        }
        return $indice;
    }

    private static function calculateDuracaoDatas(DateTime $saida, DateTime $chegada): int{
        $intervalo = $saida->diff($chegada);
        if($intervalo)
        {
            return (new \DateTime())->setTimestamp(0)->add($intervalo)->getTimestamp() / 60;
        }
        throw new ValueError("Não foi possível obter um intervalo entre saída e chegada");
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
        $horas =  (int) ($duration / 60);
        $dias = (int) ($horas / 24);
        $interval = "P";
        if($dias){
            $horas = $horas - 24;
            $interval .="{$dias}DT";
        } else{
            $interval .= "T";
        }
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
            $trechosida = array_map(function($v) use($dataSaida){
                static $saida = null;
                $trecho =  self::mapVooLocalToTrecho($v, $dataSaida, $saida);
                if($saida && $saida->format("d") < $trecho->getDataHoraSaida()->format("d")){
                    $trecho->setProximoDiaSaida(true);
                }
                if($saida){
                    $espera = self::calculateDuracao($saida->format("H:i"), $trecho->getDataHoraSaida()->format("H:i"));
                    $duracaoEspera = self::durationAsInterval($espera);
                    $trecho->setEspera($duracaoEspera);
                }
                $saida = $trecho->getDataHoraChegada();
                return $trecho;
            }, $ida);

            $valor = array_reduce($ida, fn ($carry, $tr) => $carry + $tr->valor, 0);
            $origem = $busca->origem;
            $destino = $busca->destino;
            $cia = $ida[0]->ciaAerea;
            $passagem = new PassagemLocal($valor, $cia, $origem, $destino, $trechosida, $busca);
            $passagensIda[] = $passagem;
            //$passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda)
        }
        if ($busca->data_chegada) {
            foreach ($voltas as $volta) {
                $dataSaida = new DateTime($busca->data_chegada);
                $trechosVolta = array_map(function ($v) use($dataSaida) {
                    static $saida = null;
                    $trecho =  self::mapVooLocalToTrecho($v, $dataSaida,$saida);
                    if ($saida && $saida->format("d") < $trecho->getDataHoraSaida()->format("d")) {
                        $trecho->setProximoDiaSaida(true);
                    }
                    if ($saida) {
                        $espera = self::calculateDuracao($saida->format("H:i"), $trecho->getDataHoraSaida()->format("H:i"));
                        $duracaoEspera = self::durationAsInterval($espera);
                        $trecho->setEspera($duracaoEspera);
                    }
                    $saida = $trecho->getDataHoraChegada();
                    return $trecho;
                }, $volta);
                $valor = array_reduce($volta, fn ($carry, $tr) => $carry + $tr->valor, 0);
                $origem = $busca->destino;
                $destino = $busca->origem;
                $cia = $volta[0]->ciaAerea;
                $passagem = new PassagemLocal($valor, $cia, $origem, $destino, $trechosVolta, $busca);
                $passagensVolta[] = $passagem;
                //$passagem = new Passagem($preco, $cia, $codOrigem, $codDestino, $dataHoraSaidaIda, $dataHoraChegadaIda, $duracaoIda, $trechosIda)
            }
        }
        usort($passagensIda, fn (PassagemLocal $passagem1, PassagemLocal $passagem2) => $passagem1->getPreco() > $passagem2->getPreco());
        usort($passagensVolta, fn (PassagemLocal $passagem1, PassagemLocal $passagem2) => $passagem1->getPreco() > $passagem2->getPreco());
        return ["ida" => $passagensIda, "volta" => $passagensVolta];
    }

    public function juntaIdasEVoltas(array $idas, array $voltas = [])
    {
        if (count($voltas) == 0) {
            return $idas;
        }
        $retorno = [];

        $menor = count($idas) < count($voltas) ? count($idas) : count($voltas);
        for ($i = 0; $i < $menor; $i++) {
        }
    }

    public function jsonSerialize(): mixed
    {
        $retorno =
            [
                "origem" => $this->codOrigem,
                "destino" => $this->codDestino,
                "preco" => number_format($this->preco, 2, ",", "."),
                "dataHoraSaida" => $this->dataHoraSaida->format(DateTime::ATOM),
                "dataHoraChegada" => $this->dataHoraChegada->format(DateTime::ATOM),
                "duracao" => $this->duracao,
                "trocaAeroporto" => false,
                "trechos" => $this->trechos,
                "paradas" => count($this->trechos) - 1,
            ];
        return $retorno;
    }

    private static function mapVooLocalToTrecho(Voo $voo, DateTime $original, ?DateTime $saida = null)
    {
        $dataSaida = DateTime::createFromFormat("H:i", $voo->hora_saida);
        $dataChegada = DateTime::createFromFormat("H:i", $voo->hora_chegada);
        //Verifica se o voo atual sai depois do voo anterior, se se for o primeiro, seta a data na data do original
        if ($saida){
            $date = $saida;
            $dataSaida->setDate($date->format("Y"), $date->format("m"), $date->format("d"));
            $dataChegada->setDate($date->format("Y"), $date->format("m"), $date->format("d"));
            if ($dataSaida < $date) {
                $dataSaida->add(DateInterval::createFromDateString('1 day'));
                $dataChegada->add(DateInterval::createFromDateString('1 day'));
            }
        } else{
            $dataSaida->setDate($original->format("Y"), $original->format("m"), $original->format("d"));
            $dataChegada->setDate($original->format("Y"), $original->format("m"), $original->format("d"));

        }
        if ($dataChegada < $dataSaida) {
            $dataChegada->add(DateInterval::createFromDateString('1 day'));
        }
        $origem = $voo->cod_origem;
        $destino = $voo->cod_destino;
        $numero = $voo->numero;
        $cia = $voo->ciaAerea->codigo_iata . " - " . $voo->ciaAerea->razao_social;
        $aeronave = $voo->aeronave->sigla . " - " . $voo->aeronave->marca;
        $duracao = self::durationAsInterval($voo->duracao);
        return new Trecho($dataSaida, $dataChegada, $duracao, $origem, $destino, $numero, $cia, $aeronave);
    }
}
