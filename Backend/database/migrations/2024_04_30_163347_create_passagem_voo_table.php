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
        Schema::create('passagem_voo', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('passagem_id')->references('id')->on('passagem')->onDelete('cascade');
            $table->foreignUuid('voo_id')->references('id')->on('voo')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passagem_voo');
    }
};
