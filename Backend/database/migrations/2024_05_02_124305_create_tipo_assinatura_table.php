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
        Schema::create('tipo_assinatura', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->decimal('valor', 8, 2);
            $table->integer('meses');
            $table->timestamps();
        });

        Schema::table('assinatura', function (Blueprint $table) {
            $table->foreignUuid('tipo_assinatura_id')->references('id')->on('tipo_assinatura');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('tipo_assinatura');
        Schema::table('assinatura', function (Blueprint $table) {
            $table->dropForeign('tipo_assinatura_id');
        });
    }
};
