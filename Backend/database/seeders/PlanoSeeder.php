<?php

namespace Database\Seeders;

use App\Models\Plano;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlanoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plano::create(['nome' => 'Anual', 'valor' => 749.99, 'meses' => 12]);
        Plano::create(['nome' => 'Semestral', 'valor' => 399.99, 'meses' => 6]);
        Plano::create(['nome' => 'Trimestral', 'valor' => 249.99, 'meses' => 3]);
        Plano::create(['nome' => 'Mensal', 'valor' => 99.99, 'meses' => 1]);
    }
}
