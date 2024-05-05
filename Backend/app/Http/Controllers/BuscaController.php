<?php

namespace App\Http\Controllers;

use App\Services\AmadeusApiService;
use App\Models\Helpers\Passagem;
use App\Models\Busca;
use App\Http\Resources\BuscaResource;
use App\Http\Requests\BuscaRequest;
use App\Models\Assinatura;

class BuscaController extends Controller
{

    /**
     * Display a listing of the resource.
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
     * Store a newly created resource in storage.
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
        $user = auth('api')->user();
        $voos = $api->procuraVooPost($codOrigem, $codDestino, $saida, $retorno, $cias);
        if(count($voos['data']) > 0){
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
        $busca->pesquisado_em = (new \DateTime)->format(\DateTime::ATOM);
        if(!!$user){
            $busca->users()->associate($user);
        }
        $busca->save();
        $busca->passagens = $passagens;
        return new BuscaResource($busca);

    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        //
    }
}
