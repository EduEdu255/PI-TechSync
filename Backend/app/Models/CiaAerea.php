<?php

namespace App\Models;

use Illuminate\Auth\Passwords\CanResetPassword;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CiaAerea extends Authenticatable implements JWTSubject
{
    use HasFactory, HasUuids, CanResetPassword;

    protected $fillable = [
        'razao_social',
        'cnpj',
        'codigo_iata',
        'email',
        'url',
        'telefone',
        'login',
        'password'
    ];

    protected $table = 'cia_aerea';

    protected $hidden = [
        'password',
        'login'
    ];
    protected $casts = [
        'password' => 'hashed',
    ];

    public function voos():HasMany{
        return $this->hasMany(Voo::class);
    }

    public function assinatura(): HasOne{
        return $this->hasOne(Assinatura::class);
    }

    public function login($array)
    {
        if (!Auth::attempt(['login' => $array['login'], 'password' => $array['password']])) {
            throw new HttpResponseException(response()->json(['Login ou senha incorreto.'], 400));
        }
        $user = JWTAuth::fromUser(Auth::user());
        return response()->json($user);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'login' => $this->login,
            'cnpj' => $this->cnpj
        ];
    }
}
