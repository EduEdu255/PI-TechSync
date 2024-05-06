<?php

namespace App\Http\Controllers;

use App\Models\Plano;
use App\Http\Requests\UpdatePlanoRequest;
use App\Http\Requests\PlanoRequest;
use App\Http\Requests\StorePlanoRequest;
use App\Http\Resources\PlanoResource;

class PlanoController extends Controller
{
    /**
     * Mostra Planos
     */
    public function index()
    {
        return PlanoResource::collection(Plano::paginate(30));
    }


    /**
     * Cadastra Plano
     *
     * Cria novo Plano para companhias aéreas. Apenas Administradores
     */
    public function store(PlanoRequest $request)
    {
        $data = $request->all();
        $existente = Plano::where('meses', $data['meses'])->get();
        if ($existente->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Tipo de Assinatura com essa frequencia mensal já existe'], 400);
        }

        $plano = new Plano();
        $plano->fill($data);
        $plano->save();
        return response()->json(new PlanoResource($plano), 201);
    }

    /**
     * Mostra Plano
     *
     * Traz os detalhes individuais do plano informado
     */
    public function show(string $id)
    {
        $plano = Plano::findOrFail($id);
        return response()->json(new PlanoResource($plano));
    }

    /**
     * Atualiza Plano
     *
     * Atualiza os dados do Plano informado. Apenas Administradores
     */
    public function update(PlanoRequest $request, string $id)
    {
        $plano = Plano::findOrFail($id);
        $plano->fill($request->all());
        $plano->save();
        return response()->json(new PlanoResource($plano));
    }

    /**
     * Remove Plano
     *
     * Remove o plano informado do banco de dados
     */
    public function destroy(string $id)
    {
        $plano = Plano::findOrFail($id);
        $plano->delete();
        return response()->json(['success' => true, 'message' => "Tipo de Assinatura removido com sucesso"], 204);
    }
}
