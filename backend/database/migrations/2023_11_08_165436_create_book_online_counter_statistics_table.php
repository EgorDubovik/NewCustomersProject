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
        Schema::create('book_online_counter_statistics', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('prev_url')->nullable();
            $table->integer('book_online_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_online_counter_statistics');
    }
};
