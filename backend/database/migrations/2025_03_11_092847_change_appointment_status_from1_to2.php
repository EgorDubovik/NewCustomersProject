<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        // Update status 1 to 2
        DB::table('appointments')->where('status', 1)->update(['status' => 2]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Update status 2 to 1
        DB::table('appointments')->where('status', 2)->update(['status' => 1]);
    }
};
