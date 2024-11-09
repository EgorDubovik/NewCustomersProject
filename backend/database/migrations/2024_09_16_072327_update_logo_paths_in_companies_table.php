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
    public function up()
    {
        // Get the base URL from the environment file
        $awsFileAccessUrl = env('AWS_FILE_ACCESS_URL');

        // Update all logos by prepending the full URL to the existing paths
        DB::table('company')
            ->whereNotNull('logo')
            ->where('logo', 'not like', "$awsFileAccessUrl%") // Ensure we don't update already updated logos
            ->update([
                'logo' => DB::raw("CONCAT('$awsFileAccessUrl', logo)")
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Get the base URL from the environment file
        $awsFileAccessUrl = env('AWS_FILE_ACCESS_URL');

        // Remove the base URL from all logos (undo the update)
        DB::table('company')
            ->whereNotNull('logo')
            ->where('logo', 'like', "$awsFileAccessUrl%")
            ->update([
                'logo' => DB::raw("REPLACE(logo, '$awsFileAccessUrl', '')")
            ]);
    }
};
