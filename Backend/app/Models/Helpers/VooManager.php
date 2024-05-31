<?php

namespace App\Models\Helpers;

use App\Models\Voo;
use App\Models\CiaAerea;
use App\Models\Busca;
use Illuminate\Database\Eloquent\Builder;

class VooManager
{
    private array $idas = [];
    private array $voltas = [];
    public function __construct(private Busca $busca, private array $cias, private int $maxConexoes)
    {
        $this->getPossibilidades();
    }

    private function getPossibilidades()
    {
        $idas = $this->getPossiveisVoos($this->busca->origem, $this->busca->destino, $this->maxConexoes);
        $voltas = $this->busca->data_chegada ? $this->getPossiveisVoos($this->busca->destino, $this->busca->origem, $this->maxConexoes) : [];
        $passagens = PassagemLocal::fromBusca($this->busca, $idas, $voltas);
        $this->idas = $passagens['ida'];
        $this->voltas = $passagens['volta'];
    }

    public function getViagens()
    {
        $retorno = [];
        foreach ($this->cias as $cia) {
            $retorno[$cia] = [];
            $idas = array_values(array_filter($this->idas, fn ($ida) => $ida->getCiaAerea()->codigo_iata == $cia));
            $voltas = array_values(array_filter($this->voltas, fn ($volta) => $volta->getCiaAerea()->codigo_iata == $cia));
            $qteIdas = count($idas);
            $qteVoltas = count($voltas);
            //Se não tiver volta
            if($qteVoltas == 0){
                $qteVoltas = $qteIdas;
            }
            $menor = $qteIdas < $qteVoltas ? $qteIdas : $qteVoltas;
            for ($i = 0; $i < $menor; $i++) {
                $volta = count($voltas) > 0 ? $voltas[$i] : null;
                $retorno[$cia][] = ['ida' => $idas[$i], 'volta' => $volta];
            }
        }
        $lista = array_values($retorno);
        $arr = array_merge([], ...$lista);
        $viagens = [];
        foreach($arr as $viagem){
            $ida = $viagem['ida'];
            $volta = $viagem['volta'];
            $preco = $ida->getPreco() + ($volta?->getPreco() ?? 0);
            $busca = $ida->getBusca();
            $cia = $ida->getCiaAerea();
            $viagem = new Viagem($busca, $preco, $cia, $ida, $volta);
            $viagens[] = $viagem;
        }
        usort($viagens, fn (Viagem $viagem1, Viagem $viagem2) => $viagem2->getPreco() < $viagem1->getPreco());
        return $viagens;
    }

    private function getPossiveisVoos(string $codOrigem, string $codDestino, int $maxConexoes, array $visitados = [], ?string $horaMinima = null, $ciaOrigem = null): array
    {
        $assinantes = CiaAerea::query()->whereIn('codigo_iata', $this->cias)->get();
        /**
         * @var Builder $query
         */
        $query = Voo::query()
            ->where('cod_origem', $codOrigem)
            ->whereNotIn('cod_destino', $visitados)
            ->whereIn('cia_aerea_id', $assinantes->map(function ($ass) {
                return  $ass->id;
            }));

        if ($horaMinima) {
            //Pesquisa voos independemente de hora de chegada de um anterior
            $query = $query->where('hora_saida', '>', $horaMinima);
        }

        //Buscar voos apenas da companhia aérea que chegou
        if ($ciaOrigem) {
            $query = $query->where('cia_aerea_id', $ciaOrigem->id);
        }
        //Pesquisa voos que saem após a chegada do voo anterior (está em conexão)
        $voos = $query->get();
        $possibilidades = [];

        //Itera sobre os voos encontrados

        /**
         * @var Voo $voo
         */

        foreach ($voos as $voo) {
            //Se o destino do voo é o buscado, então adiciona à array de conexões, uma array com o voo encontrado como item (chegou ao destino)
            if ($voo->cod_destino == $codDestino) {
                $possibilidades[] = [$voo];
                //Se não chegou ao destino, verifica se já chegou ao número máximo de conexões (2 por padrão)
            } else if (count($visitados) < $this->maxConexoes) {
                //Adiciona o destino aos aeroportos já visitados
                $visitados[] = $voo->cod_destino;
                //Busca recursiva de voos, a partir do destino do presente voo, para o destino pretendido, ou seja, pesquisa agora os voos a partir desta conexão
                $conexoesDaqui = $this->getPossiveisVoos($voo->cod_destino, $codDestino, $maxConexoes - 1, $visitados, $voo->hora_chegada, $voo->ciaAerea);
                //Se encontrou conexões a partir daqui, para cada conexão encontrada, adiciona à array de conexões onde já tinha o voo anterior (para chegar nesse destino) as conexões possíveis
                if (count($conexoesDaqui) > 0) {
                    foreach ($conexoesDaqui as $conexao) {
                        $possibilidades[] = array_merge([$voo], $conexao);
                    }
                }
                //Remove dos visitados para permitir pesquisa em backtrack
                unset($visitados[array_search($voo->cod_destino, $visitados)]);
            }
        }
        //Retorna os voos possíveis
        return $possibilidades;
    }
}
