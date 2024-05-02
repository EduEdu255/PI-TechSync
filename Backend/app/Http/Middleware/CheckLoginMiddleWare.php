<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckLoginMiddleWare
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(str_ends_with($request->getUri(), 'login')){
            $request->headers->remove('authorization');
            $request->server->remove('HTTP_AUTHORIZATION');
        }
        return $next($request);
    }
}
