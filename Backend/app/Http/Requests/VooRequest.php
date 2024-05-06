<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VooRequest extends FormRequest
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
            'numero' => 'required|integer',
            'aeronave' => 'required',
            'cod_origem'=> 'required|size:3',
            'cod_destino' => 'required|size:3',
            'hora_saida' => 'required|date_format:H:i',
            'hora_chegada' => 'required|date_format:H:i',
        ];
    }
}
