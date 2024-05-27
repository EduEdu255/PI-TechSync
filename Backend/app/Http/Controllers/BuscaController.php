<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use App\Services\AmadeusApiService;
use App\Models\Voo;
use App\Models\Helpers\PassagemLocal;
use App\Models\Helpers\Passagem;
use App\Models\CiaAerea;
use App\Models\Busca;
use App\Models\Assinatura;
use App\Http\Resources\VooResource;
use App\Http\Resources\BuscaResource;
use App\Http\Requests\BuscaRequest;
use Illuminate\Support\Facades\DB;

class BuscaController extends Controller
{

    /**
     *
     * Consulta Buscas
     *
     * Traz informações das buscas já realizadas no sistema
     */
    public function index()
    {
        $user = auth('api')->user();
        $cia = auth('aereas')->user();
        if (!$user && !$cia) {
            return response()->json(["success" => false, "message" => "Sem permissão"], 403);
        }
        return BuscaResource::collection(Busca::paginate(50));
    }

    /**
     * Realiza Busca
     *
     *
     * Realiza busca na API de voos e retorna as passagens encontradas com os parâmetros informados
     */
    public function store(BuscaRequest $request, AmadeusApiService $api)
    {
        $data = $request->all();
        $retorno = $data['volta'] ?? null ? new \DateTime($data['volta']) : null;
        $saida = new \DateTime($data['ida']);
        $assinaturasAtivas = Assinatura::where('ativa', true)->get();
        $cias = [];
        foreach ($assinaturasAtivas as $assinatura) {
            $cia = $assinatura->ciaAerea;
            $cias[] = $cia->codigo_iata;
        }

        if (!!$retorno && $retorno < $saida) {
            [$saida, $retorno] = [$retorno, $saida];
        }
        $codOrigem = $data['origem'];
        $codDestino = $data['destino'];
        $voos = $api->procuraVooPost($codOrigem, $codDestino, $saida, $retorno, $cias);
        if (array_key_exists('data', $voos) && count($voos['data']) > 0) {
            $passagens = Passagem::fromResult($voos);
        } else {
            $passagens = [];
        }
        $busca = new Busca();
        $busca->fill($data);
        $busca->data_saida = $saida->format('Y-m-d');
        if (isset($retorno)) {
            $busca->data_chegada = $retorno->format('Y-m-d');
        }
        $user = auth('api')->user();
        $busca->pesquisado_em = (new \DateTime)->format(\DateTime::ATOM);
        if (!!$user) {
            $busca->users()->associate($user);
        }
        $busca->save();
        $busca->passagens = $passagens;
        return new BuscaResource($busca);
    }

    public function buscar(BuscaRequest $request)
    {
        $data = $request->all();
        $retorno = $data['volta'] ?? null ? new \DateTime($data['volta']) : null;
        $saida = new \DateTime($data['ida']);
        $assinaturasAtivas = Assinatura::where('ativa', true)->get();
        $cias = [];
        foreach ($assinaturasAtivas as $assinatura) {
            $cia = $assinatura->ciaAerea;
            $cias[] = $cia->codigo_iata;
        }

        if (!!$retorno && $retorno < $saida) {
            [$saida, $retorno] = [$retorno, $saida];
        }
        $codOrigem = $data['origem'];
        $codDestino = $data['destino'];
        $possibilidades = $this->getPossiveisVoos($codOrigem, $codDestino, $cias);
        $idas = [];
        foreach ($possibilidades as $possibilidade) {
            $idas[] = $possibilidade;
        }
        $voltas=[];
        if (!!$retorno) {
            $possibilidades = $this->getPossiveisVoos($codDestino, $codOrigem, $cias);
            foreach ($possibilidades as $possibilidade) {
                $voltas[] = $possibilidade;
            }
        }
        $busca = new Busca();
        $busca->fill($data);
        $busca->data_saida = $saida->format('Y-m-d');
        if (isset($retorno)) {
            $busca->data_chegada = $retorno->format('Y-m-d');
        }
        $user = auth('api')->user();
        $busca->pesquisado_em = (new \DateTime)->format(\DateTime::ATOM);
        if (!!$user) {
            $busca->users()->associate($user);
        }
        $passagens = PassagemLocal::fromBusca($busca, $idas, $voltas);
        $busca->save();
        $busca->passagens = $passagens;
        return new BuscaResource($busca);
    }

    /**
     * Reservar
     *
     * Endpoint para informar que alguma passagem resultante da busca identificada foi reservada
     */
    public function reservar(int $id)
    {
        $busca = Busca::find($id);
        $busca->reservou = true;
        $busca->save();
        return new BuscaResource($busca);
    }

    private function getPossiveisVoos(string $codOrigem, string $codDestino, array $cias = ['AD', 'LA', 'G3'], array $visitados = [], $maxConexoes = 2, ?string $horaMinima = null): array
    {
        $assinantes = CiaAerea::query()->whereIn('codigo_iata', $cias)->get();
        if (!$horaMinima) {
            //Pesquisa voos independemente de hora de chegada de um anterior
            $voos = Voo::query()
                ->where('cod_origem', $codOrigem)
                ->whereNotIn('cod_destino', $visitados)
                ->whereIn('cia_aerea_id', $assinantes->map(function ($ass) {
                    return  $ass->id;
                }))
                ->get();
        } else {
            //Pesquisa voos que saem após a chegada do voo anterior (está em conexão)
            $voos = Voo::query()
                ->where('cod_origem', $codOrigem)
                ->where('hora_saida', '>', $horaMinima)
                ->whereIn('cia_aerea_id', $assinantes->map(function ($ass) {
                    return  $ass->id;
                }))
                ->whereNotIn('cod_destino', $visitados)
                ->get();
        }


        $possibilidades = [];

        //Itera sobre os voos encontrados
        foreach ($voos as $voo) {
            //Se o destino do voo é o buscado, então adiciona à array de conexões, uma array com o voo encontrado como item (chegou ao destino)
            if ($voo->cod_destino == $codDestino) {
                $possibilidades[] = [$voo];
                //Se não chegou ao destino, verifica se já chegou ao número máximo de conexões (2 por padrão)
            } else if (count($visitados) < $maxConexoes) {
                //Adiciona o destino aos aeroportos já visitados
                $visitados[] = $voo->cod_destino;
                //Busca recursiva de voos, a partir do destino do presente voo, para o destino pretendido, ou seja, pesquisa agora os voos a partir desta conexão
                $conexoesDaqui = $this->getPossiveisVoos($voo->cod_destino, $codDestino, $cias, $visitados, $maxConexoes - 1, $voo->hora_chegada);
                //Se encontrou conexões a partir daqui, para cada conexão encontrada, adiciona à array de conexões onde já tinha o voo anterior (para chegar nesse destino) as conexões possíveis
                if (count($conexoesDaqui) > 0) {
                    foreach ($conexoesDaqui as $conexao) {
                        $possibilidades[] = array_merge([$voo], $conexao);
                    }
                }
                //Remove dos visitados para permitir pesquisa em outros voos
                unset($visitados[array_search($voo->cod_destino, $visitados)]);
            }
        }
        //Retorna os voos possíveis
        return $possibilidades;
    }

    public function contagemOrigem(){
        $buscas = DB::table('busca')
        ->select('origem', DB::raw('count(origem) as total'))
        ->groupBy('origem')
        ->get();

        return response()->json($buscas);

    }
    public function contagemDestino(){
        $buscas = DB::table('busca')
        ->select('destino', DB::raw('count(destino) as total'))
        ->groupBy('destino')
        ->get();

        return response()->json($buscas);
    }
}
