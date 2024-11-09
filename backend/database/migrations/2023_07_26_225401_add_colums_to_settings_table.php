<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->integer('payment_deposit_type')->default(0);
            $table->integer('payment_deposit_amount')->default(100);
            $table->integer('payment_deposit_amount_prc')->default(25);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn('payment_deposit_type');
        });
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn('payment_deposit_amount');
        });
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn('payment_deposit_amount_prc');
        });
    }
};
