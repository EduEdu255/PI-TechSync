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
     * Display a listing of the resource.
     */
    public function index()
    {
        return AeronaveResource::collection(Aeronave::paginate());
    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new AeronaveResource(Aeronave::findOrFail($id));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $aeronave = Aeronave::findOrFail($id);
        $aeronave->fill($request->all());
        $aeronave->save();
        return $aeronave;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $aeronave = Aeronave::findOrFail($id);
        $aeronave->delete();
        return response()->json(['success' => true, 'message' => "Aeronave apagada com sucesso"]);
    }
}
