<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\VooController;
use App\Http\Controllers\CiaAereaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssinaturaController;
use App\Http\Controllers\AeronaveController;
use App\Http\Controllers\BuscaController;
use App\Http\Controllers\FormaPagamentoController;
use App\Http\Controllers\PagamentoController;
use App\Http\Controllers\PlanoController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'auth',
        'namespace' => 'App\Http\Controllers'
    ],
    function ($router) {
        Route::get('me', 'AuthController@me');
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::post('register', 'AuthController@register');
    }
);

Route::controller(CiaAereaController::class)->middleware('auth.aerea')->group(function () {
    Route::get('/cia_aerea/{id}', 'show');
    Route::patch('/cia_aerea/{id}', 'update');
    Route::delete('/cia_aerea/{id}', 'destroy');
});
Route::get('/cia_aerea', [CiaAereaController::class, 'index'])->middleware('isAdmin');
Route::post('/cia_aerea', [CiaAereaController::class,'store']);
Route::post('/cia_aerea/login', [CiaAereaController::class, 'login']);

Route::controller(VooController::class)->middleware('auth.aerea')->group(function () {
    Route::post('/voo', 'store');
    Route::get('/voo', 'index');
    Route::get('/voo/{id}', 'show');
    Route::patch('/voo/{id}', 'update');
    Route::delete('/voo/{id}', 'destroy');
});

Route::controller(AeronaveController::class)->middleware('auth.aerea')->group(function () {
    Route::post('/aeronave', 'store');
    Route::get('/aeronave', 'index');
    Route::get('/aeronave/{id}', 'show');
    Route::patch('/aeronave/{id}', 'update');
    Route::delete('/aeronave/{id}', 'destroy');
});

Route::controller(AssinaturaController::class)->middleware('auth.aerea')->group(function () {
    Route::post('/assinatura', 'store');
    Route::get('/assinatura', 'index');
    Route::get('/assinatura/{id}', 'show');
    Route::patch('/assinatura/{id}', 'update');
    Route::delete('/assinatura/{id}', 'destroy');
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
    Route::get('/busca', 'index');
    Route::post('/busca', 'store');
    Route::patch('/busca/reservar/{id}', 'reservar');
});
