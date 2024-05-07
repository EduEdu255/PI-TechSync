<?php

namespace Database\Seeders;

use App\Models\FormaPagamento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormaPagamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FormaPagamento::create(['nome' => 'Cartão de Crédito', 'parcelas' => 12]);
        FormaPagamento::create(['nome' => 'Cartão de Débito', 'parcelas' => 1]);
        FormaPagamento::create(['nome' => 'Pix', 'parcelas' => 1]);
    }
}
