<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('appointment_images')
        ->join('appointments', 'appointment_images.job_id', '=', 'appointments.id')
        ->update([
            'appointment_images.job_id' => DB::raw('appointments.job_id')
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('appointment_images')
            ->join('appointments', 'appointment_images.job_id', '=', 'appointments.job_id')
            ->update([
                'appointment_images.job_id' => DB::raw('appointments.id')
            ]);
    }
};
