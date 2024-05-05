<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BuscaRequest extends FormRequest
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
            'origem' => 'required|size:3',
            'destino'=> 'required|size:3',
            'ida' => 'required|date_format:Y-m-d',
            'volta' => 'date_format:Y-m-d'
        ];
    }
}
