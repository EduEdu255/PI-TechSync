<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\VooController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\PagamentoController;
use App\Http\Controllers\FormaPagamentoController;
use App\Http\Controllers\CiaAereaController;
use App\Http\Controllers\BuscaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssinaturaController;
use App\Http\Controllers\AeronaveController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/auth/login', [AuthController::class,'login']);

Route::controller(AuthController::class)->prefix('auth')->middleware('api')->group(function(){
    Route::get('me', 'me');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('register', 'register');
    Route::post('profile_pic', 'saveImage');
});

Route::controller(CiaAereaController::class)->middleware('auth.aerea')->prefix('cia_aerea')->group(function () {
    Route::get('profile', 'show');
    Route::patch('{id}', 'update');
    Route::delete('{id}', 'destroy');
    Route::post('logo', 'saveLogo');
});
Route::get('/cia_aerea', [CiaAereaController::class, 'index'])->middleware('isAdmin');
Route::post('/cia_aerea', [CiaAereaController::class,'store']);
Route::post('/cia_aerea/login', [CiaAereaController::class, 'login']);

Route::controller(VooController::class)->middleware('auth.assinante')->group(function () {
    Route::post('/voo', 'store');
    Route::get('/voo', 'index');
    Route::get('/voo/{id}', 'show');
    Route::patch('/voo/{id}', 'update');
    Route::delete('/voo/{id}', 'destroy');
});

Route::controller(AeronaveController::class)->middleware('auth.assinante')->group(function () {
    Route::post('/aeronave', 'store');
    Route::get('/aeronave', 'index');
    Route::get('/aeronave/{id}', 'show');
    Route::patch('/aeronave/{id}', 'update');
    Route::delete('/aeronave/{id}', 'destroy');
});

Route::controller(AssinaturaController::class)->middleware('auth.aerea')->group(function () {
    Route::post('/assinatura', 'store');
    Route::get('/assinatura/{id}', 'show');
    Route::patch('/assinatura/{id}', 'update');
    Route::delete('/assinatura/{id}', 'destroy');
});

Route::controller(AssinaturaController::class)->middleware('isAdmin')->group(function(){
    Route::get('/assinatura', 'index');
    Route::get('/assinatura/{id}/ativar', 'ativarAssinatura');
    Route::get('/assinatura/{id}/desativar', 'desativarAssinatura');
});

Route::controller(PlanoController::class)->group(function () {
    Route::get('/plano', 'index');
    Route::post('/plano', 'store')->middleware('isAdmin');
    Route::get('/plano/{id}', 'show');
    Route::patch('/plano/{id}', 'update')->middleware('isAdmin');
    Route::delete('/plano/{id}', 'destroy')->middleware('isAdmin');
});

Route::controller(FormaPagamentoController::class)->group(function () {
    Route::get('/forma_pagamento', 'index');
    Route::post('/forma_pagamento', 'store')->middleware('isAdmin');
    Route::get('/forma_pagamento/{id}', 'show');
    Route::patch('/forma_pagamento/{id}', 'update')->middleware('isAdmin');
    Route::delete('/forma_pagamento/{id}', 'destroy')->middleware('isAdmin');
});

Route::controller(PagamentoController::class)->middleware('auth.aerea')->group(function () {
    Route::get('/pagamento', 'index');
    Route::post('/pagamento', 'store');
});

Route::controller(BuscaController::class)->group(function () {
    Route::post('/busca', 'store');
    Route::post('/busca_local', 'buscar');
    Route::patch('/busca/reservar/{id}', 'reservar');
});
Route::controller(BuscaController::class)->middleware('auth.assinante')->group(function (){
    Route::get('/busca', 'index');
    Route::get('/origens_busca', 'contagemOrigem');
    Route::get('/destinos_busca', 'contagemDestino');
    Route::get('/mes_busca', 'destinosPorMes');
});

Route::controller(PasswordController::class)->group(function(){
    Route::post('/user/forgot_password', 'sendLink');
    Route::post('/user/reset_password', 'reset');
    Route::post('/cia_aerea/forgot_password', 'sendLinkCia');
    Route::post('/cia_aerea/reset_password', 'resetCia');
});

Route::controller(UserController::class)->middleware('isAdmin')->group(function(){
    Route::get('/user', 'index');
    Route::patch('/user/{id}/make_admin', 'makeAdmin');
    Route::delete('/user/{id}', 'destroy');
});
