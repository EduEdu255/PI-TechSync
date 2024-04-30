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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome', 60);
            $table->string('email', 60)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 255);
            $table->date('nascimento')->nullable();
            $table->string('cpf', 11)->nullable();
            $table->string('telefone', 14)->nullable();
            $table->string('logradouro', 80)->nullable();
            $table->string('numero', 6)->nullable();
            $table->string('complemento', 30)->nullable();
            $table->string('municipio', 80)->nullable();
            $table->string('uf', 2)->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
