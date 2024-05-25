<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\CiaAerea;
use App\Models\Aeronave;
use App\Http\Resources\CiaAereaResource;
use App\Http\Resources\AeronaveResource;
use App\Http\Requests\AeronaveRequest;

class AeronaveController extends Controller
{

    /**
     * Traz as lista de aeronaves cadastradas
     */
    public function index()
    {
        return AeronaveResource::collection(Aeronave::all());
    }

    /**
     * Cadastra uma nova aeronave.
     *
     * Endpoint para cadastrar uma nova aeronave. Devem ser informados os campos necessários
     */
    public function store(AeronaveRequest $request)
    {
        $data = $request->all();
        $existing = Aeronave::where('sigla', $data['sigla'])->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Aeronave já está cadastrada'], 400);
        }
        $aeronave = Aeronave::create($data);
        $aeronave->save();
        return response()->json($aeronave, 201);
    }

    /**
     * Traz a Aeronave com o id (uuid) especificado
     */
    public function show(string $id)
    {
        return new AeronaveResource(Aeronave::findOrFail($id));
    }


    /**
     * Atualiza a aeronave com o id (uuid) especificado
     */
    public function update(AeronaveRequest $request, string $id)
    {
        $aeronave = Aeronave::findOrFail($id);
        $aeronave->fill($request->all());
        $aeronave->save();
        return $aeronave;
    }

    /**
     * Apaga a aeronave com o id (uuid) especificado
     */
    public function destroy(string $id)
    {
        $aeronave = Aeronave::findOrFail($id);
        $aeronave->delete();
        return response()->json(['success' => true, 'message' => "Aeronave apagada com sucesso"]);
    }
}
