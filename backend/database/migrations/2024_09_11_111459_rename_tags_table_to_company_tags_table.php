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
        Schema::rename('tags', 'company_tags');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('company_tags', 'tags');
    }
};
