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
        CiaAerea::create(['id' => '9bfb61db-f647-4f5d-a799-55bb1492c186', 'email' => 'contato@voegol.com.br', 'razao_social' => 'Gol Linhas Aéreas', 'login' => 'GolAerea', 'password' => bcrypt('GolAerea'), 'cnpj' => '12345678965412', 'codigo_iata' => 'G3', 'url' => 'https://b2c.voegol.com.br/compra/busca-parceiros?pv=br&tipo=DF&de=JDO&para=EZE&ida=23-05-2024&volta=26-06-2024&ADT=1&ADL=0&CHD=0&INF=0']);
        CiaAerea::create(['id' => '9bfb61dc-4d40-4317-bb8f-531c864a518e', 'email' => 'contato@latam.com', 'razao_social' => 'TAM Airlines', 'login' => 'TamAirlines', 'password' => bcrypt('TamAirlines'), 'cnpj' => '12345678964512', 'codigo_iata' => 'LA', 'url' => 'https://www.latamairlines.com/br/pt/oferta-voos?origin=JDO&inbound=2024-06-21T12%3A00%3A00.000Z&outbound=2024-06-15T12%3A00%3A00.000Z&destination=FOR&adt=1&chd=0&inf=0&trip=RT&cabin=Economy&redemption=false&sort=RECOMMENDED']);
        CiaAerea::create(['id' => '9bfb61dc-a75a-45f6-be0c-e0c4a2eb5f48', 'email' => 'contato@voeazul.com.br', 'razao_social' => 'Azul Linhas Aéreas', 'login' => 'AzulAerea', 'password' => bcrypt('AzulAerea'), 'cnpj' => '12345679865412', 'codigo_iata' => 'AD', 'url' => 'https://www.voeazul.com.br/br/pt/home/selecao-voo?c[0].ds=JDO&c[0].std=06/06/2024&c[0].as=GRU&c[1].ds=GRU&c[1].std=06/11/2024&c[1].as=JDO&p[0].t=ADT&p[0].c=1&p[0].cp=false&f.dl=3&f.dr=3&cc=BRL']);
    }
}
