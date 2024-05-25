<?php

namespace App\Http\Controllers;

use App\Models\CiaAerea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    /**
     * Solicitar Link Usuário
     *
     * Solicitar token para realizar a troca de senha
     */
    public function sendLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $user = Password::getUser($request->only('email'));
        $token = Password::createToken($user);
        return response()->json(['reset_token' => $token]);
    }

    /**
     * Reset Senha Usuário
     *
     * Realiza o reset de senha do usuário
     */

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'password_repeat' => 'required',
            'token' => 'required'
        ]);
        if ($request->password != $request->password_repeat) {
            return response()->json(['message' => 'Senha e Confirmação são diferentes']);
        }
        try {
            $status = Password::reset(
                $request->only('email', 'password', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->save();
                }
            );
            if($status === Password::PASSWORD_RESET){
                return response()->json([
                    'message' => 'Senha resetada com sucesso.'
                ]);
            }
            return response()->json(['message' => __($status)]);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $th) {
            return response()->json([
                ['message' => 'Falha ao resetar a senha do usuário']
            ], 500);
        }
    }

    /**
     * Solicitar Link CiaAérea
     *
     * Solicitar token para realizar a troca de senha para CiaAerea
     */
    public function sendLinkCia(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'cnpj' => 'required'
        ]);
        $cnpj = $request->get('cnpj');
        $cnpj = str_replace(['.', ',', '/', '-'], '', $cnpj);
        $cia = CiaAerea::query()->where('cnpj', $cnpj)->where('login', $request->get('login'))->get()->first();
        if($cia){
            $token = Password::createToken($cia);
            return response()->json(['reset_token' => $token]);
        }
        return response()->json(['message' => 'Não foi possível encontrar Companhia Aérea com os dados informados'], 400);
    }

    /**
     * Reset Senha CiaAérea
     *
     * Realiza o reset de senha da Cia Aérea
     */

    public function resetCia(Request $request)
    {
        $request->validate([
            'login' => 'required',
            'password' => 'required',
            'password_repeat' => 'required',
            'token' => 'required'
        ]);
        if ($request->password != $request->password_repeat) {
            return response()->json(['message' => 'Senha e Confirmação são diferentes']);
        }
        try {
            $status = Password::broker('ciaAerea')->reset(
                $request->only('login', 'password', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->save();
                }
            );
            if ($status === Password::PASSWORD_RESET)
            return response()->json([
                'message' => 'Senha resetada com sucesso.'
            ]);
            else{
                return response()->json(['message' => __($status)]);
            }
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $th) {
            return response()->json([
                ['message' => 'Falha ao resetar a senha do usuário']
            ], 500);
        }
    }
}
