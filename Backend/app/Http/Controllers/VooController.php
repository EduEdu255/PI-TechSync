<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Voo;
use App\Models\CiaAerea;
use App\Models\Aeronave;
use App\Http\Resources\VooResource;
use App\Http\Resources\CiaAereaResource;
use App\Http\Requests\VooRequest;

class VooController extends Controller
{

    /**
     * Lista Voos
     *
     * Traz todos os voos da companhia aérea logada
     */
    public function index()
    {
        $cia = auth('aereas')->user();

        return VooResource::collection(Voo::where('cia_aerea_id', $cia->id));
    }

    /**
     * Cadastra Voo
     *
     * Realiza o cadastro de um novo voo, vinculando-o à companhia aérea logada
     */
    public function store(VooRequest $request)
    {
        $data = $request->all();
        $cia = auth('aereas')->user();
        $existing = Voo::where('numero', $data['numero'])->get();
        $aeronave = Aeronave::where('sigla', $data['aeronave'])->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Voo já está cadastrado'], 400);
        }
        if($aeronave->count() == 0){
            return response()->json(['success' => false, 'message' => 'Aeronave informada não encontrada'], 400);
        }
        $voo = new Voo();
        $voo->ciaAerea()->associate($cia);
        $voo->aeronave()->associate($aeronave->first());
        $voo->fill($data);
        $voo->save();
        return response()->json(new VooResource($voo), 201);
    }

    /**
     * Mostra Voo
     *
     * Traz detalhes do voo com o id informado
     */
    public function show(string $id)
    {
        return new VooResource(Voo::findOrFail($id));
    }


    /**
     * Atualiza Voo
     *
     * Atualiza o voo identificado
     */
    public function update(Request $request, string $id)
    {
        $voo = Voo::findOrFail($id);
        $cia = auth('aereas')->user();
        if($voo->ciaAerea->id != $cia->id){
            return response()->json(['success' => false, 'message' => 'Vôo não pertence à sua companhia aérea'],403);
        }
        $voo->fill($request->all());
        $voo->save();
        return new VooResource($voo);
    }

    /**
     * Remove Voo
     *
     * Remove o Voo identificado do banco de dados
     */
    public function destroy(string $id)
    {
        $voo = Voo::findOrFail($id);
        $cia = auth('aereas')->user();
        if ($voo->ciaAerea->id != $cia->id) {
            return response()->json(['success' => false, 'message' => 'Vôo não pertence à sua companhia aérea'], 403);
        }
        $voo->delete();
        return response()->json(['success' => true, 'message' => "Voo apagado com sucesso"]);
    }
}
