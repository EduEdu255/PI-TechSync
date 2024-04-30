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
            $table->decimal('valor', 7, 2, true);
            $table->datetime('validade');
            $table->boolean('ativa');
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
