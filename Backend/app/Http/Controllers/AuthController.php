<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRequest;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }


    /**
     *
     * Registrar Usuário
     *
     * Registra um novo usuário no sistema
     */

    public function register(UserRequest $request): JsonResponse{

        $data = $request->all();
        if($data['password'] != $data['password_repeat']){
            return response()->json(['success'=> false,'message' => 'Senhas não conferem'], 400);
        }
        $existing = User::where('email', $data['email'])->get();
        if($existing->count() > 0){
            return response()->json(['success' => false,'message' => 'Usuário já existe'], 400);
        }
        $user = User::create($data);
        $user->save();
        return response()->json(new UserResource($user));
    }


    /**
     *
     * Profile Picture
     *
     * Envia o arquivo de imagem para ser configurado como foto de perfil
     */

    public function saveImage(ImageUploadRequest $request): JsonResponse{
        $user = auth('api')->user();
        if(!$user){
            return response()->json(['message' => 'Usuário não está logado'], 401);
        }
        /**
         * @var User $user
         */
        $fileName = $user->id . '.' . $request->file('image')->getClientOriginalExtension();
        $file = $request->file('image');
        if (is_array($file)) {
            return response()->json(['message' => 'Somente aceito o envio de 1 arquivo'], 422);
        }
        $file->storeAs('public/user_profile', $fileName);
        $user->profile_pic = 'user_profile/' . $fileName;
        $user->save();
        return response()->json(new UserResource($user));
    }

    /**
     *
     * Login
     *
     * Realiza o login de um usuário cadastrado no sistema
     */

    public function login(Request $request): JsonResponse{
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $credentials = request(['email', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    /**
     *
     * Informações do Usuário
     *
     * Traz informações sobre qual o usuário que está logado no sistema
     *
     */

    public function me(): JsonResponse
    {
        $user = auth('api')->user();
        return response()->json(new UserResource(auth('api')->user()));
    }

    /**
     *
     * Logout
     *
     * Realiza o logout do usuário logado
     */

    public function logout(): JsonResponse
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     *
     * Atualiza Token
     *
     * Faz a atualização do token do usuário, caso ainda não esteja vencido
     */

    public function refresh(): JsonResponse{
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

}
