<?php

namespace App\Http\Controllers;

use App\Models\TipoAssinatura;
use App\Models\FormaPagamento;
use App\Models\CiaAerea;
use App\Models\Assinatura;
use App\Http\Resources\AssinaturaResource;
use App\Http\Requests\AssinaturaRequest;

class AssinaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cia = auth('aereas')->user();
        $assinaturas = Assinatura::where('cia_aerea_id', $cia->id)->with("ciaAerea", "formaPagamento", "tipoAssinatura")->get();
        return AssinaturaResource::collection($assinaturas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AssinaturaRequest $request)
    {
        $cia = auth('aereas')->user();
        $data = $request->all();
        $existing = Assinatura::where('cia_aerea_id', $cia->id)->where('ativa', true)->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Cia Aérea já possui assinatura ativa']);
        }

        $tipo = TipoAssinatura::find($data['tipo_assinatura']);
        if(!$tipo){
            return response()->json(['success' => false, 'message' => 'Tipo de Assinatura não encontrado!']);
        }
        $formaPagamento = FormaPagamento::find($data['forma_pagamento']);
        if(!$formaPagamento || $formaPagamento->parcelas < $data['parcelas']){
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
        $assinatura->tipoAssinatura()->associate($tipo);
        $assinatura->formaPagamento()->associate($formaPagamento);
        $assinatura->ciaAerea()->associate($cia);
        $cia->assinatura()->save($assinatura);
        $tipo->assinaturas()->save($assinatura);
        $formaPagamento->assinaturas()->save($assinatura);
        $assinatura->save();
        return response()->json($assinatura, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $assinatura = Assinatura::findOrFail($id)->loadMissing("ciaAerea", "formaPagamento", "tipoAssinatura");
        return new AssinaturaResource($assinatura);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AssinaturaRequest $request, string $id)
    {
        $assinatura = Assinatura::findOrFail($id);
        $assinatura->fill($request->all());
        $assinatura->save();
        return new AssinaturaResource($assinatura);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $assinatura = Assinatura::findOrFail($id);
        $assinatura->ativa = false;
        $assinatura->validade = now();
        $assinatura->save();
    }
}
