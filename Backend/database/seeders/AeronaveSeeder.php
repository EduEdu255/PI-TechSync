<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Aeronave;

class AeronaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Aeronave::create(['id' => '9bf729e7-87df-46bb-81c3-89d3171d04c3', 'sigla' => 'E95', 'marca' => 'EMBRAER 195', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf729eb-c5db-436f-9c0a-d99dbac2192b', 'sigla' => '320', 'marca' => 'AIRBUS A320', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf729ef-ac83-45c8-b6cc-7be5413eb186', 'sigla' => '32Q', 'marca' => 'AIRBUS A321NEO', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf729f3-8e43-4d06-ad57-180b0a9f9c16', 'sigla' => '73G', 'marca' => 'BOEING 737-700', 'qte_assentos' => 240, 'created_at' => null, 'updated_at' => '2024-05-23 21:01:56']);
        Aeronave::create(['id' => '9bf729f7-7423-4e58-80a2-d99cbd772705', 'sigla' => '738', 'marca' => 'BOEING 737-800', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf729fb-5f72-4fb9-b786-c2b2d15aaacd', 'sigla' => '295', 'marca' => 'EMBRAER 195 E2', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf729ff-3f7f-4ffc-8491-36959077dd99', 'sigla' => 'AT7', 'marca' => 'ATR 72', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf72a03-2c67-475a-bf85-30406a7d473d', 'sigla' => 'CN1', 'marca' => 'CESSNA (SINGLE PISTON ENGINE)', 'qte_assentos' => 175, 'created_at' => null, 'updated_at' => '2024-05-23 21:01:16']);
        Aeronave::create(['id' => '9bf72a07-0322-4c5b-a4b9-1d9d4628004f', 'sigla' => '321', 'marca' => 'AIRBUS A321', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf72a0a-f201-4888-a16c-83ad40155bd8', 'sigla' => '319', 'marca' => 'AIRBUS A319', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf72a0e-d62f-48cf-9cec-2f9b85b7581c', 'sigla' => '789', 'marca' => 'BOEING 787-9', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
        Aeronave::create(['id' => '9bf72a12-b699-4b5f-b56b-16e3db23f77a', 'sigla' => '7M8', 'marca' => 'BOEING 737 MAX 8', 'qte_assentos' => 180, 'created_at' => null, 'updated_at' => null]);
    }
}
