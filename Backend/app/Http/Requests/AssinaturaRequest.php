<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssinaturaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tipo_assinatura' => 'required|size:36',
            'forma_pagamento' => 'required|size:36',
            'parcelas' => 'required|integer'
        ];
    }
}
