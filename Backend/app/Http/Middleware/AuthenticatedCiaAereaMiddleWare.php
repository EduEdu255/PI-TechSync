<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Closure;
use App\Models\CiaAerea;

class AuthenticatedCiaAereaMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): JsonResponse
    {
        $user = auth('aereas')->user();
        if(!$user || !($user instanceof CiaAerea)){
            return response()->json([
                'success' => false,
                'message' => "Apenas para companhias aéreas"
            ], 401);
        }
        return $next($request);
    }
}
