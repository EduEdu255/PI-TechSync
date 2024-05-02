<?php

namespace App\Http\Controllers;

use App\Models\FormaPagamento;
use App\Http\Requests\FormaPagamentoRequest;

class FormaPagamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FormaPagamento::all();
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        return response()->json($formaPagamento);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(FormaPagamentoRequest $request, string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        $formaPagamento->fill($request->all());
        $formaPagamento->save();
        return response()->json($formaPagamento);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $formaPagamento = FormaPagamento::findOrFail($id);
        $formaPagamento->delete();
        return response()->json(["success" => true, "message" => "Forma de pagamento {$formaPagamento->nome} apagada com sucesso"]);
    }
}
