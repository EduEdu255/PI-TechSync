<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\CiaAerea;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create(['email' => 'thormes@gmail.com', 'password' => bcrypt('a$$word'), 'is_admin'=> true, 'nome' => 'Thormes Filgueira Leite Pereira']);
        $this->call([
            CiaAereaSeeder::class,
            FormaPagamentoSeeder::class,
            PlanoSeeder::class
        ]);
        
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
