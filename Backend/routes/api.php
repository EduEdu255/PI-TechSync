<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\VooController;
use App\Http\Controllers\CiaAereaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssinaturaController;
use App\Http\Controllers\AeronaveController;
use App\Http\Controllers\FormaPagamentoController;
use App\Http\Controllers\PagamentoController;
use App\Http\Controllers\TipoAssinaturaController;

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
    ], function($router){
        Route::get('me', 'AuthController@me');
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
        Route::post('register', 'AuthController@register');
    }
);

Route::controller(CiaAereaController::class)->group(function (){
    Route::post('/cia_aerea', 'store');
    Route::get('/cia_aerea', 'index');
    Route::post('/cia_aerea/login', 'login');
    Route::get('/cia_aerea/{id}', 'show');
    Route::patch('/cia_aerea/{id}', 'update');
    Route::delete('/cia_aerea/{id}', 'destroy');
})->middleware('isAdmin');

Route::controller(VooController::class)->middleware('auth.aerea')->group(function (){
    Route::post('/voo', 'store');
    Route::get('/voo', 'index');
    Route::get('/voo/{id}', 'show');
    Route::patch('/voo/{id}', 'update');
    Route::delete('/voo/{id}', 'destroy');
});

Route::controller(AeronaveController::class)->middleware('auth.aerea')->group(function (){
    Route::post('/aeronave', 'store');
    Route::get('/aeronave', 'index');
    Route::get('/aeronave/{id}', 'show');
    Route::patch('/aeronave/{id}', 'update');
    Route::delete('/aeronave/{id}', 'destroy');
});

Route::controller(AssinaturaController::class)->middleware('auth.aerea')->group(function (){
    Route::post('/assinatura', 'store');
    Route::get('/assinatura', 'index');
    Route::get('/assinatura/{id}', 'show');
    Route::patch('/assinatura/{id}', 'update');
    Route::delete('/assinatura/{id}', 'destroy');
});

Route::controller(TipoAssinaturaController::class)->group(function(){
    Route::get('/tipo_assinatura', 'index');
    Route::post('/tipo_assinatura', 'store')->middleware('isAdmin');
    Route::get('/tipo_assinatura/{id}', 'show');
    Route::patch('/tipo_assinatura/{id}', 'update')->middleware('isAdmin');
    Route::delete('/tipo_assinatura/{id}', 'destroy')->middleware('isAdmin');
});

Route::controller(FormaPagamentoController::class)->group(function(){
    Route::get('/forma_pagamento', 'index');
    Route::post('/forma_pagamento', 'store')->middleware('isAdmin');
    Route::get('/forma_pagamento/{id}', 'show');
    Route::patch('/forma_pagamento/{id}', 'update')->middleware('isAdmin');
    Route::delete('/forma_pagamento/{id}', 'destroy')->middleware('isAdmin');
});

Route::controller(PagamentoController::class)->group(function(){
    Route::get('/pagamento', 'index');
    Route::post('/pagamento', 'store')->middleware('auth.aerea');
});
