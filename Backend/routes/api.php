<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\VooController;
use App\Http\Controllers\CiaAereaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AeronaveController;


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

Route::controller(VooController::class)->group(function (){
    Route::post('/voo', 'store');
    Route::get('/voo', 'index');
    Route::get('/voo/{id}', 'show');
    Route::patch('/voo/{id}', 'update');
    Route::delete('/voo/{id}', 'destroy');
})->middleware('aereas');

Route::controller(AeronaveController::class)->group(function (){
    Route::post('/aeronave', 'store');
    Route::get('/aeronave', 'index');
    Route::get('/aeronave/{id}', 'show');
    Route::patch('/aeronave/{id}', 'update');
    Route::delete('/aeronave/{id}', 'destroy');
})->middleware('aereas');
