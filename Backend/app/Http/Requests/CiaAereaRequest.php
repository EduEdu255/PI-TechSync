<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CiaAereaRequest extends FormRequest
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
            'cnpj' => 'required|size:14',
            'razao_social' => 'required',
            'codigo_iata' => 'required|size:2',
            'url' => 'required'
        ];
    }
}
