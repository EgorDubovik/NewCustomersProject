<?php

use Illuminate\Database\Migrations\Migration;

use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('job_notes')
            ->join('appointments', 'job_notes.job_id', '=', 'appointments.id')
            ->update([
                'job_notes.job_id' => DB::raw('appointments.job_id')
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('job_notes')
            ->join('appointments', 'job_notes.job_id', '=', 'appointments.job_id')
            ->update([
                'job_notes.job_id' => DB::raw('appointments.id')
            ]);
    }
};
