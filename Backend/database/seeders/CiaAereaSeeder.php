<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CiaAerea;

class CiaAereaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CiaAerea::create(['email' => 'contato@voegol.com.br', 'razao_social' => 'Gol Linhas Aéreas', 'login' => 'GolAerea', 'password' => bcrypt('GolAerea'), 'cnpj' => '12345678965412', 'codigo_iata' => 'G3', 'url' => 'https://voegol.com.br']);
        CiaAerea::create(['email' => 'contato@latam.com', 'razao_social' => 'TAM Airlines', 'login' => 'TamAirlines', 'password' => bcrypt('TamAirlines'), 'cnpj' => '12345678964512', 'codigo_iata' => 'LA', 'url' => 'https://latam.com/br']);
        CiaAerea::create(['email' => 'contato@voeazul.com.br', 'razao_social' => 'Azul Linhas Aéreas', 'login' => 'AzulAerea', 'password' => bcrypt('AzulAerea'), 'cnpj' => '12345679865412', 'codigo_iata' => 'AD', 'url' => 'https://voeazul.com.br']);
    }
}
