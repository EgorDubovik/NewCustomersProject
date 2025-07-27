<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\BookOnline;
use App\Mail\BookOnlineForCompany;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmailsBookAppointmentOnline implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $appointment;
    protected $key;

    /**
     * Create a new job instance.
     */
    public function __construct($appointment, $key)
    {
        $this->appointment = $appointment;
        $this->key = $key;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Send email to customer
        if ($this->appointment->job->customer->email)
            Mail::to($this->appointment->job->customer->email)->send(new BookOnline($this->appointment, $this->key));

        // Send email to company
        if ($this->appointment->company->email)
            Mail::to($this->appointment->company->email)->send(new BookOnlineForCompany($this->appointment));

        // Send email to techs
        foreach ($this->appointment->techs as $tech) {
            if ($tech->email)
                Mail::to($tech->email)->send(new BookOnlineForCompany($this->appointment));
        }
    }
}
