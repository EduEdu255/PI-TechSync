<?php

namespace App\Http\Controllers;

use App\Services\AmadeusApiService;
use App\Models\Helpers\Passagem;
use App\Models\Busca;
use App\Http\Resources\BuscaResource;
use App\Http\Requests\BuscaRequest;
use App\Http\Resources\VooResource;
use App\Models\Assinatura;
use App\Models\Voo;
use Illuminate\Support\Collection;

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
        if(!$user && !$cia){
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
        foreach($assinaturasAtivas as $assinatura){
            $cia = $assinatura->ciaAerea;
            $cias[] = $cia->codigo_iata;
        }

        if(!!$retorno && $retorno < $saida){
            [$saida, $retorno] = [$retorno, $saida];
        }
        $codOrigem = $data['origem'];
        $codDestino = $data['destino'];
        $voos = $api->procuraVooPost($codOrigem, $codDestino, $saida, $retorno, $cias);
        if(array_key_exists('data', $voos) && count($voos['data']) > 0){
            $passagens = Passagem::fromResult($voos);
        } else{
            $passagens = [];
        }
        $busca = new Busca();
        $busca->fill($data);
        $busca->data_saida = $saida->format('Y-m-d');
        if(isset($retorno)){
            $busca->data_chegada = $retorno->format('Y-m-d');
        }
        $user = auth('api')->user();
        $busca->pesquisado_em = (new \DateTime)->format(\DateTime::ATOM);
        if(!!$user){
            $busca->users()->associate($user);
        }
        $busca->save();
        $busca->passagens = $passagens;
        return new BuscaResource($busca);

    }

    public function buscar(BuscaRequest $request){
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
        $voos = $this->getPossiveisVoos($codOrigem, $codDestino);
        return response()->json($voos);
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

    private function getPossiveisVoos(string $codOrigem, string $codDestino, array $visitados = [], $maxConexoes = 2, ?string $horaMinima = null): array{
        if(!$horaMinima){
            $voos = Voo::query()
                    ->where('cod_origem', $codOrigem)
                    ->whereNotIn('cod_destino', $visitados)
                    ->get();
        } else{
            $voos = Voo::query()
                ->where('cod_origem', $codOrigem)
                ->where('hora_saida', '>', $horaMinima)
                ->whereNotIn('cod_destino', $visitados)
                ->get();
        }


        $conexoes = [];
        foreach($voos as $voo){
            if($voo->cod_destino == $codDestino){
                $conexoes[] = [$voo];
            } else if(count($visitados) < $maxConexoes){
                $visitados[] = $voo->cod_destino;
                $conexoesDaqui = $this->getPossiveisVoos($voo->cod_destino, $codDestino, $visitados, $maxConexoes - 1, $voo->hora_chegada);
                if(count($conexoesDaqui) > 0){
                    foreach($conexoesDaqui as $conexao){
                        $conexoes[] = array_merge([$voo], $conexao);
                    }
                }
                unset($visitados[array_search($voo->cod_destino, $visitados)]);
            }
        }
        return $conexoes;
    }
}
