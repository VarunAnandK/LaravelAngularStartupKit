<?php

namespace App\Http\Middleware;


use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class APIToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->header('Authorization')) {
            $user = DB::table('user')->where('api_token', $request->header('Authorization'))->first();
            if ($user) {
                Auth::loginUsingId($user->id);
                return $next($request);
            } else {
                return response("logout");
            }
        } else {
            return response("logout");
        }
    }
}
