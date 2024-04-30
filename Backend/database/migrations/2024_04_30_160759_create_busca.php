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
        Schema::create('busca', function (Blueprint $table) {
            $table->id();
            $table->string('origem', 3);
            $table->string('destino', 3);
            $table->foreignUuid('users_id')->nullable()->constrained();
            $table->dateTime('pesquisado_em');
            $table->date('data_saida');
            $table->date('data_chegada');
            $table->boolean('reservou');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('busca');
    }
};
