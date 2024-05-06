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
        Schema::create('pagamento', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('assinatura_id')->references('id')->on('assinatura');
            $table->foreignUuid('forma_pagamento_id')->references('id')->on('forma_pagamento');
            $table->decimal('valor', 7, 2, true);
            $table->string('detalhe_forma_pagamento');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagamento');
    }
};
