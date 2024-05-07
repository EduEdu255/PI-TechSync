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
        Schema::create('assinatura', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('cia_aerea_id')->references('id')->on('cia_aerea');
            $table->datetime('validade');
            $table->boolean('ativa');
            $table->integer('parcelas');
            $table->foreignUuid('forma_pagamento_id')->references('id')->on('forma_pagamento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assinatura');
    }
};
