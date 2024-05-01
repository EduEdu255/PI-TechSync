<?php

namespace App\Http\Controllers;

use App\Http\Requests\CiaAereaRequest;
use App\Http\Resources\CiaAereaResource;
use App\Models\CiaAerea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CiaAereaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CiaAereaResource::collection(CiaAerea::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CiaAereaRequest $request)
    {
        $data = $request->all();
        $existing = CiaAerea::where('codigo_iata', $data['codigo_iata'])->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Companhia Aérea já está cadastrada'], 400);
        }
        $cia = CiaAerea::create($data);
        $cia->save();
        return response()->json($cia);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new CiaAereaResource(CiaAerea::findOrFail($id));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cia = CiaAerea::findOrFail($id);
        $cia->fill($request->all());
        $cia->save();
        return $cia;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cia = CiaAerea::findOrFail($id);
        $cia->delete();
        return response()->json(['success' => true, 'message' => "Companhia Aérea apagada com sucesso"]);
    }
}
