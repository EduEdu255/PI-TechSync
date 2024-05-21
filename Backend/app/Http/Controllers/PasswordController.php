<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    /**
     * Solicitar Link
     *
     * Solicitar token para realizar a troca de senha
     */
    public function sendLink(Request $request){
        $request->validate([
            'email' => 'required|email'
        ]);
        $user = Password::getUser($request->only('email'));
        $token = Password::createToken($user);
        return response()->json(['reset_token' => $token]);
    }

    public function reset(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'password_repeat' => 'required',
            'token' => 'required'
        ]);
        if($request->password != $request->password_repeat){
            return response()->json(['message' => 'Senha e Confirmação são diferentes']);
        }
        try{
            $status = Password::reset($request->only('email', 'password', 'token')
            ,function($user, $password){
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );
            return response()->json([
                'message' => 'Senha resetada com sucesso.'
            ]);
        }
        catch(ValidationException $e){
            throw $e;
        } catch(\Throwable $th){
            return response()->json([
                ['message' => 'Falha ao resetar a senha do usuário']
            ],500);
        }
    }
}
