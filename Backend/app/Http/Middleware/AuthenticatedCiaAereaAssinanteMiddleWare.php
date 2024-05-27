<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Closure;
use App\Models\CiaAerea;

class AuthenticatedCiaAereaAssinanteMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): JsonResponse
    {
        $cia = auth('aereas')->user();
        if(!$cia || !($cia instanceof CiaAerea)){
            return response()->json([
                'success' => false,
                'message' => "Apenas para companhias aéreas"
            ], 401);
        }
        if(!$cia->assinatura || !$cia->assinatura->ativa){
            return response()->json([
                'success' => false,
                'message' => "Apenas para companhias aéreas que estejam com assinatura ativa"
            ], 401);
        }
        return $next($request);
    }
}
