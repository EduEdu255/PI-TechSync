<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cia_aerea', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cnpj', 14);
            $table->string('razao_social');
            $table->string('codigo_iata', 4);
            $table->string('email');
            $table->string('url');
            $table->string('telefone', 14)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_cia_aerea');
    }
};
