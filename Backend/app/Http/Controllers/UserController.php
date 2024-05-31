<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Lista Usuários
     */
    public function index()
    {
        return response()->json(UserResource::collection(User::all()));
    }


    /**
     * Transforma o usuário em admin
     */
    public function makeAdmin(string $id)
    {
        $user = User::findOrFail($id);
        $user->is_admin = true;
        $user->save();
        return response()->json(new UserResource($user));

    }

    /**
     * Apaga Usuário
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(new UserResource($user));
    }
}
