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
        Schema::table('assinatura', function (Blueprint $table) {
            $table->dropColumn('valor');
            $table->integer('parcelas');
            $table->foreignUuid('forma_pagamento_id')->references('id')->on('forma_pagamento');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assinatura', function (Blueprint $table) {
            $table->decimal('valor', 8, 2);
            $table->dropColumn('parcelas');
            $table->dropForeign('forma_pagamento_id');
        });
    }
};
