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
        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn('referral_enable');
            $table->dropColumn('referral_link');
            $table->string('setting_key');
            $table->string('setting_value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->boolean('referral_enable')->default(false);
            $table->string('referral_link')->nullable();
            $table->dropColumn('setting_key');
            $table->dropColumn('setting_value');
        });
    }
};
