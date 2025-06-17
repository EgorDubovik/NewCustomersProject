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
        Schema::create('calls_logs', function (Blueprint $table) {
            $table->string('id')->primary(); // ID звонка из OpenPhone
            $table->string('from_number');
            $table->string('to_number');
            $table->enum('direction', ['incoming', 'outgoing']);
            $table->string('status');
            $table->timestamp('answered_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->string('voicemail_url')->nullable();
            $table->integer('voicemail_duration')->nullable();
            $table->string('recording_url')->nullable();
            $table->string('conversation_id');
            $table->string('user_id')->nullable();
            $table->string('phone_number_id');
            $table->integer('company_id');
            $table->boolean('is_missed_call')->default(false);
            $table->integer('duration_seconds')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calls_logs');
    }
};
