<?php

namespace App\Http\Controllers;

use App\Models\Plano;
use App\Models\FormaPagamento;
use App\Models\CiaAerea;
use App\Models\Assinatura;
use App\Http\Resources\AssinaturaResource;
use App\Http\Requests\AssinaturaRequest;

class AssinaturaController extends Controller
{
    /**
     * Lista de assinaturas
     *
     * Traz a lista de assinaturas vinculada à companhia aérea logada no sistema
     */
    public function index()
    {
        $cia = auth('aereas')->user();
        $user = auth('api')->user();
        if(!!$cia){
            $assinaturas = Assinatura::where('cia_aerea_id', $cia->id)->with("ciaAerea", "formaPagamento", "Plano")->get();
            return AssinaturaResource::collection($assinaturas);
        }
        if(!!$user && $user->is_admin){
            $assinaturas = Assinatura::all();
            return AssinaturaResource::collection($assinaturas);
        }
        return response()->json(['message' => "Sem permissão para acessar"], 403);
    }

    /**
     * Cadastra Assinatura
     *
     * Cria uma nova assinatura para a companhia aérea logada no sistema
     */
    public function store(AssinaturaRequest $request)
    {
        $cia = auth('aereas')->user();
        $data = $request->all();
        $existing = Assinatura::where('cia_aerea_id', $cia->id)->where('ativa', true)->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Cia Aérea já possui assinatura ativa']);
        }

        $tipo = Plano::find($data['plano']);
        if (!$tipo) {
            return response()->json(['success' => false, 'message' => 'Plano não encontrado!']);
        }
        $formaPagamento = FormaPagamento::find($data['forma_pagamento']);
        if (!$formaPagamento || $formaPagamento->parcelas < $data['parcelas']) {
            return response()->json(['success' => false, 'message' => 'Quantidade de parcelas incompatível com forma de pagamento escolhida']);
        }

        $validade = (now())->addMonths($tipo->meses);
        /**
         * @var Assinatura $assinatura
         * @var CiaAerea $cia
         */

        $assinatura = new Assinatura();
        $assinatura->fill($data);
        $assinatura->ativa = false;
        $assinatura->validade = $validade;
        $assinatura->Plano()->associate($tipo);
        $assinatura->formaPagamento()->associate($formaPagamento);
        $assinatura->ciaAerea()->associate($cia);
        $cia->assinatura()->save($assinatura);
        $tipo->assinaturas()->save($assinatura);
        $formaPagamento->assinaturas()->save($assinatura);
        $assinatura->save();
        return response()->json(new AssinaturaResource($assinatura), 201);
    }

    /**
     * Mostrar Assinatura.
     *
     */
    public function show(string $id)
    {
        $cia = auth('aereas')->user();
        $assinatura = Assinatura::findOrFail($id)->loadMissing("ciaAerea", "formaPagamento", "Plano");
        if ($assinatura->ciaAerea->id != $cia->id) {
            return response()->json(['success' => false, 'message' => 'Assinatura não pertence à sua companhia aérea'], 403);
        }
        return new AssinaturaResource($assinatura);
    }

    /**
     * Atualiza Assinatura
     *
     * Atualiza os dados da assinatura informada
     */
    public function update(AssinaturaRequest $request, string $id)
    {
        $assinatura = Assinatura::findOrFail($id);
        $cia = auth('aereas')->user();
        if ($assinatura->ciaAerea->id != $cia->id) {
            return response()->json(['success' => false, 'message' => 'Assinatura não pertence à sua companhia aérea'], 403);
        }
        $assinatura->fill($request->all());
        $assinatura->save();
        return new AssinaturaResource($assinatura);
    }

    /**
     * Apagar Assinatura.
     */
    public function destroy(string $id)
    {
        $assinatura = Assinatura::findOrFail($id);
        $cia = auth('aereas')->user();
        if ($assinatura->ciaAerea->id != $cia->id) {
            return response()->json(['success' => false, 'message' => 'Assinatura não pertence à sua companhia aérea'], 403);
        }
        $assinatura->ativa = false;
        $assinatura->validade = now();
        $assinatura->save();
        return response()->json(['success' => true, 'message' => 'Assinatura apagada com sucesso'], 200);
    }

    public function ativarAssinatura(string $id){
        $assinatura = Assinatura::findOrFail($id);
        $assinatura->ativa = true;
        $assinatura->save();
        return response()->json(new AssinaturaResource($assinatura));
    }
    public function desativarAssinatura(string $id)
    {
        $assinatura = Assinatura::findOrFail($id);
        $assinatura->ativa = false;
        $assinatura->save();
        return response()->json(new AssinaturaResource($assinatura));
    }
}
