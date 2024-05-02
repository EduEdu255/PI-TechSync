<?php

namespace App\Http\Controllers;

use App\Models\Pagamento;
use App\Models\FormaPagamento;
use App\Models\CiaAerea;
use App\Models\Assinatura;
use App\Http\Resources\PagamentoResource;
use App\Http\Requests\PagamentoRequest;

class PagamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cia = auth('aereas')->user();
        $user = auth('api')->user();
        if (!$cia && !$user) {
            return response()->json(['success' => false, 'message' => "Você não tem permissão", 403]);
        }
        if (!!$user && !$user->is_aAdmin) {
            return response()->json(['success' => false, 'message' => "Você não tem permissão"], 403);
        }
        if (!!$cia) {
            $pagamentos = Pagamento::whereHas('assinatura', function ($query) use ($cia)
        {
            $query->where('cia_aerea_id', '=', $cia->id);
        })->get();
            return PagamentoResource::collection($pagamentos->loadMissing('assinatura', 'formaPagamento'));
        }
        return PagamentoResource::collection(Pagamento::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PagamentoRequest $request)
    {
        $data = $request->all();
        $cia = auth('aereas')->user();
        $assinatura = Assinatura::find($data['assinatura']);
        if(!$assinatura){
            return response()->json(['success' => false, 'message' => 'Assinatura não encontrada'], 400);
        }
        $formaPagamento = FormaPagamento::find($data['forma_pagamento']);
        if(!$formaPagamento){
            return response()->json(['success' => false, 'message' => 'Forma de Pagamento não encontrada'], 400);
        }
        if($data['valor'] > $assinatura->tipoAssinatura->valor){
            return response()->json(['success' => false, 'message' => 'Valor do pagamento não pode ser superior ao valor da assinatura'], 400);
        }
        $realizados = $assinatura->pagamentos;
        $limite = $formaPagamento->parcelas;
        $restante = $limite - $realizados->count();
        //Se já foram pagas todas as parcelas
        if($restante <= 0){
            return response()->json(['success' => false, 'message' => 'Não há parcelas pendentes de pagamento'], 400);
        }
        $valorPago = $realizados->reduce(function(?int $carry = 0, Pagamento $pagamento){
            return $carry + $pagamento->valor;
        });
        $valorRestante = $assinatura->tipoAssinatura->valor - $valorPago;
        if($restante == 1 && $data['valor'] < $valorRestante){
            return response()->json(['success' => false, 'message' => "Esse é seu último pagamento. O valor de R$". number_format($data['valor'], 2, ",",".") . " não é suficiente para pagar o restante de R$" . number_format($valorRestante, 2, ",", ".")], 400);
        }
        $assinatura->ativa = true;
        $assinatura->save();
        $pagamento = new Pagamento();
        $pagamento->valor = $data['valor'];
        $pagamento->formaPagamento()->associate($formaPagamento);
        $pagamento->assinatura()->associate($assinatura);
        $pagamento->detalhe_forma_pagamento = $data['detalhe_forma_pagamento'] ?? $formaPagamento->nome;
        $pagamento->save();
        return response()->json($pagamento, 201);




    }

    /**
     * Display the specified resource.
     */
    public function show(Pagamento $pagamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PagamentoRequest $request, Pagamento $pagamento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pagamento $pagamento)
    {
        //
    }
}
