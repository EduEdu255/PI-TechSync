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
        Schema::create('voo', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('numero');
            $table->foreignUuid('aeronave_id')->references('id')->on('aeronave');
            $table->foreignUuid('cia_aerea_id')->references('id')->on('cia_aerea');
            $table->string('cod_origem', 3);
            $table->string('cod_destino', 3);
            $table->time('hora_saida');
            $table->time('hora_chegada');
            $table->integer('duracao')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_voo');
    }
};
