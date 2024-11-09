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

        DB::table('appointments')
            ->orderBy('id')
            ->chunk(100, function ($appointments) {
                foreach ($appointments as $appointment) {
                    $jobId = DB::table('jobs')->insertGetId([
                        'customer_id' => $appointment->customer_id,
                        'address_id' => $appointment->address_id,
                        'company_id' => $appointment->company_id,
                        'created_at' => $appointment->created_at,
                        'updated_at' => $appointment->updated_at,
                    ]);

                    DB::table('appointments')
                        ->where('id', $appointment->id)
                        ->update(['job_id' => $jobId]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        DB::table('jobs')
            ->orderBy('id')
            ->chunk(100, function ($jobs) {
                foreach ($jobs as $job) {
                    DB::table('appointments')
                        ->where('job_id', $job->id)
                        ->update([
                            'customer_id' => $job->customer_id,
                            'address_id' => $job->address_id,
                            'company_id' => $job->company_id,
                        ]);
                    DB::table('jobs')
                        ->where('id', $job->id)
                        ->delete();
                }
            });
    }
};
