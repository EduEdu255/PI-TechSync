<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\CiaAerea;
use App\Models\Voo;
use App\Http\Resources\CiaAereaResource;
use App\Http\Resources\VooResource;
use App\Http\Requests\VooRequest;

class VooController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return VooResource::collection(Voo::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VooRequest $request)
    {
        $data = $request->all();
        $existing = Voo::where('numero', $data['numero'])->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Voo já está cadastrado'], 400);
        }
        $voo = Voo::create($data);
        $voo->save();
        return response()->json($voo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new VooResource(Voo::findOrFail($id));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Voo = Voo::findOrFail($id);
        $Voo->fill($request->all());
        $Voo->save();
        return $Voo;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Voo = Voo::findOrFail($id);
        $Voo->delete();
        return response()->json(['success' => true, 'message' => "Voo apagado com sucesso"]);
    }
}
