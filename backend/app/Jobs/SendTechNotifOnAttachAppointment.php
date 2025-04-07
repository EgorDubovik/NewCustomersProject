<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\onTechAttachAppointment;

class SendTechNotifOnAttachAppointment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $appointment;
    protected $techEmails;
    /**
     * Create a new job instance.
     */
    public function __construct($appointment, $techEmails)
    {
        $this->techEmails = $techEmails;
        $this->appointment = $appointment;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (count($this->techEmails) > 0)
            Mail::to($this->techEmails[0])->send(new onTechAttachAppointment($this->appointment));
    }
}
