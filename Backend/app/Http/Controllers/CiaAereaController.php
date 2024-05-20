<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Scramble;
use App\Models\CiaAerea;
use App\Http\Resources\CiaAereaResource;
use App\Http\Requests\ImageUploadRequest;
use App\Http\Requests\CiaAereaRequest;

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
        return response()->json(new CiaAereaResource($cia), 201);
    }

    /**
     * Mostra Companhia
     *
     * Traz companhia aérea logada
     */
    public function show()
    {
        $cia = auth('aereas')->user();
        return response()->json(new CiaAereaResource($cia));
    }

    /**
     *
     * Logo
     *
     * Envia o arquivo de imagem para ser configurado como Logo da cia
     */

    public function saveImage(ImageUploadRequest $request): JsonResponse
    {
        $cia = auth('aereas')->user();
        if (!$cia) {
            return response()->json(['message' => 'Cia Aérea não está logada'], 403);
        }
        /**
         * @var CiaAerea $cia
         */
        $fileName = $cia->id . '.' . $request->file('image')->getClientOriginalExtension();
        $file = $request->file('image');
        $path = $file->storeAs('public/cia_logo', $fileName);
        $cia->logo = $path;
        $cia->save();
        return response()->json(new CiaAereaResource($cia));
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
        return new CiaAereaResource($cia);
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
