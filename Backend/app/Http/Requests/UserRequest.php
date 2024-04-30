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
            'cpf' => 'size:11',
            'nascimento' => 'date_format:Y-m-d',
            'telefone' => 'string|min:13|max:14'
        ];
    }
}
