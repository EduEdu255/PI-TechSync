<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use App\Services\AmadeusApiService;
use App\Models\Voo;
use App\Models\Helpers\ViagemLocal;
use App\Models\Helpers\PassagemApi;
use App\Models\CiaAerea;
use App\Models\Busca;
use App\Models\Assinatura;
use App\Http\Resources\VooResource;
use App\Http\Resources\BuscaResource;
use App\Http\Requests\BuscaRequest;
use App\Models\Helpers\VooManager;
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
            $passagens = PassagemApi::fromResult($voos);
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
        $hoje = now();
        
        //Valida data de ida e volta, se estão no passado
        if ($saida < $hoje) {
            return response()->json(['message' => 'Ida precisa ser superior à data de hoje']);
        }
        if ($retorno && $retorno < $hoje) {
            return response()->json(['message' => 'Volta precisa ser superior à data de hoje']);
        }

        // Inverte as datas se a ida for posterior à volta
        if (!!$retorno && $retorno < $saida) {
            [$saida, $retorno] = [$retorno, $saida];
        }

        //Verifica quais companhias aéreas estão com assinatura ativa, para buscar passagem só delas
        $assinaturasAtivas = Assinatura::where('ativa', true)->get();
        $cias = [];
        foreach ($assinaturasAtivas as $assinatura) {
            $cia = $assinatura->ciaAerea;
            $cias[] = $cia->codigo_iata;
        }

        //Cria a busca, com os dados enviados
        $busca = new Busca();
        $busca->fill($data);
        $busca->pesquisado_em = (new \DateTime)->format(\DateTime::ATOM);
        $busca->data_saida = $saida->format('Y-m-d');
        if (isset($retorno)) {
            $busca->data_chegada = $retorno->format('Y-m-d');
        }

        //Verifica se tem usuário logado para vincular à busca
        $user = auth('api')->user();
        if (!!$user) {
            $busca->users()->associate($user);
        }

        //Instancia o VooManager com os dados da busca, estabelecendo como limite máximo de conexões 2
        $vooManager = new VooManager($busca, $cias, 2);
        $busca->save();

        //Adiciona à busca as possibilidades de viagens encontradas
        $busca->passagens = $vooManager->getViagens();
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


    /**
     * Contagem Origem
     *
     * Endpoint que traz a quantidade de buscas realizadas organizadas por origem
     */
    public function contagemOrigem()
    {
        $buscas = DB::table('busca')
            ->select('origem', DB::raw('count(origem) as total'))
            ->groupBy('origem')
            ->get();

        $total = $buscas->reduce(fn ($carry, $item) => $carry + $item->total, 0);
        foreach ($buscas as $busca) {
            $busca->percentual = $busca->total / $total;
        }

        return response()->json($buscas);
    }

    /**
     * Contagem Destino
     *
     * Endpoint que traz a quantidade de buscas realizadas organizadas por Destino
     */
    public function contagemDestino()
    {
        $buscas = DB::table('busca')
            ->select('destino', DB::raw('count(destino) as total'))
            ->groupBy('destino')
            ->get();

        $total = $buscas->reduce(fn ($carry, $item) => $carry + $item->total, 0);
        foreach ($buscas as $busca) {
            $busca->percentual = $busca->total / $total;
        }
        return response()->json($buscas);
    }

    /**
     * Contagem Mensal
     *
     * Endpoint que traz a quantidade de buscas realizadas organizadas por mês de saída
     */
    public function destinosPorMes()
    {
        $buscas = DB::table('busca')
            ->select(DB::raw('count(data_saida) as total'), DB::raw("strftime('%m',data_saida) as mes"))
            ->groupBy('mes')
            ->get();
        $total = $buscas->reduce(fn ($carry, $item) => $carry + $item->total, 0);
        foreach ($buscas as $busca) {
            $busca->percentual = $busca->total / $total;
        }
        return response()->json($buscas);
    }
}
