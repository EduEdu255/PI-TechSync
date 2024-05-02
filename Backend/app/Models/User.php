<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{


    use Notifiable, HasUuids;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'email',
        'password',
        'nascimento',
        'cpf',
        'telefone',
        'logradouro',
        'numero',
        'municipio',
        'uf'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'nome' => $this->nome,
            'email' => $this->email
        ];
    }

    public function login($array)
    {
        if (!Auth::attempt(['email' => $array['email'], 'password' => $array['password']])) {
            throw new HttpResponseException(response()->json(['Usuário ou senha incorreto.'], 400));
        }
        $user = JWTAuth::fromUser(Auth::user());
        return response()->json($user);
    }

    public function buscas(): HasMany
    {
        return $this->hasMany(Busca::class);
    }
}
