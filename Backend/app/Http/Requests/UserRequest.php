<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends BaseRequest
{


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required',
            'nome' => 'required',
            'password' => 'required',
            'password_repeat' => 'required',
            'uf' => 'size:2',
            'logradouro' => 'nullable|string',
            'numero' => 'nullable|string',
            'complemento'=> 'nullable|string',
            'municipio'=> 'nullable|string',
            'cpf' => 'nullable|size:11',
            'nascimento' => 'nullable|date_format:Y-m-d',
            'telefone' => 'nullable|string|min:13|max:14'
        ];
    }
}
