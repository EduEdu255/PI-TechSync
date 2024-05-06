<?php

namespace App\Http\Controllers;

use App\Models\FormaPagamento;
use App\Http\Requests\FormaPagamentoRequest;

class FormaPagamentoController extends Controller
{
    /**
     * Lista Formas de Pagamento
     */
    public function index()
    {
        return FormaPagamento::all();
    }

    /**
     * Cria Forma de Pagamento
     */
    public function store(FormaPagamentoRequest $request)
    {
        $data = $request->all();
        $existente = FormaPagamento::where('nome', $data['nome']);
        if($existente->count() > 0){
            return response()->json(["success" => false, "message" => "Forma de Pagamento já cadastrada"]);
        }
        $formaPagamento = FormaPagamento::create($data);
        $formaPagamento->save();
        return response()->json($formaPagamento, 201);
    }

    /**
     * Mostra Forma de Pagamento
     */
    public function show(string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        return response()->json($formaPagamento);
    }


    /**
     * Atualiza Forma de Pagamento
     */
    public function update(FormaPagamentoRequest $request, string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        $formaPagamento->fill($request->all());
        $formaPagamento->save();
        return response()->json($formaPagamento);
    }

    /**
     * Remove Forma de Pagamento
     */
    public function destroy(string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        $formaPagamento->delete();
        return response()->json(["success" => true, "message" => "Forma de pagamento {$formaPagamento->nome} apagada com sucesso"]);
    }
}
