<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\CiaAerea;
use App\Http\Resources\CiaAereaResource;
use App\Http\Requests\CiaAereaRequest;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;

class CiaAereaController extends Controller
{


    /**
     * Mostra Cias
     *
     * Traz lista das companhias aéreas cadastradas
     */
    public function index()
    {
        return CiaAereaResource::collection(CiaAerea::paginate(30));
    }

    /**
     * Criar Companhia aérea
     *
     * Cria uma nova companhia aérea, caso não tenha alguma já cadastrada com o mesmo código iata
     */
    public function store(CiaAereaRequest $request)
    {
        $data = $request->all();
        if ($data['password'] != $data['password_repeat']) {
            return response()->json(['success' => false, 'message' => 'Senhas não conferem'], 400);
        }
        $existing = CiaAerea::where('codigo_iata', $data['codigo_iata'])->get();
        if ($existing->count() > 0) {
            return response()->json(['success' => false, 'message' => 'Companhia Aérea já está cadastrada'], 400);
        }
        $cia = CiaAerea::create($data);
        $cia->save();
        return response()->json($cia, 201);
    }

    /**
     * Mostra Companhia
     *
     * Traz companhia aérea identificada pelo id (uuid) informado
     */
    public function show(string $id)
    {
        return new CiaAereaResource(CiaAerea::findOrFail($id));
    }


    /**
     * Atualiza Companhia
     *
     * Atualiza dados da companhia aérea informada pelo id (uuid)
     */
    public function update(Request $request, string $id)
    {
        $cia = CiaAerea::findOrFail($id);
        $cia->fill($request->all());
        $cia->save();
        return $cia;
    }

    /**
     * Apaga Companhia Aérea
     *
     * Remove a Companhia Aérea identificada (uuid) do banco de dados
     */
    public function destroy(string $id)
    {
        $cia = CiaAerea::findOrFail($id);
        $cia->delete();
        return response()->json(['success' => true, 'message' => "Companhia Aérea apagada com sucesso"]);
    }

    /**
     * Login
     *
     * Endpoint para realizar o login da companhia aérea, conforme login e senha informados no cadastro
     */

    public function login(Request $request): JsonResponse
    {
        $request->validate(
            [
                'login' => 'required',
                'password' => 'required'
            ]
        );
        $credentials = request(['login', 'password']);
        if (!$token = auth('aereas')->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('aereas')->factory()->getTTL() * 60
        ]);
    }
}
