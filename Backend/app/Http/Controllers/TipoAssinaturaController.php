<?php

namespace App\Http\Controllers;

use App\Models\TipoAssinatura;
use App\Http\Requests\UpdateTipoAssinaturaRequest;
use App\Http\Requests\TipoAssinaturaRequest;
use App\Http\Requests\StoreTipoAssinaturaRequest;

class TipoAssinaturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TipoAssinatura::all();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(TipoAssinaturaRequest $request)
    {
        $data = $request->all();
        $existente = TipoAssinatura::where('meses', $data['meses'])->get();
        if ($existente->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Tipo de Assinatura com essa frequencia mensal já existe'], 400);
        }

        $tipo = new TipoAssinatura();
        $tipo->fill($data);
        $tipo->save();
        return response()->json($tipo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tipoAssinatura = TipoAssinatura::findOrFail($id);
        return response()->json($tipoAssinatura);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TipoAssinaturaRequest $request, string $id)
    {
        $tipoAssinatura = TipoAssinatura::findOrFail($id);
        $tipoAssinatura->fill($request->all());
        $tipoAssinatura->save();
        return response()->json($tipoAssinatura);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tipoAssinatura = TipoAssinatura::findOrFail($id);
        $tipoAssinatura->delete();
        return response()->json(['success' => true, 'message' => "Tipo de Assinatura removido com sucesso"], 204);
    }
}
