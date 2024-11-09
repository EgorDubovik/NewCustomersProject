<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class BookOnline extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $appointment;
    public $key;
    public $headerTitle;
    public $company;
    
    public function __construct($appointment,$key)
    {
        $this->appointment = $appointment;
        $this->key = $key;
        $this->headerTitle = 'New appointment online';
        $this->company = $appointment->company;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $company = $this->appointment->company;
        return $this->from($company->email,$company->name)
                    ->replyTo($company->email,$company->name)
                    ->subject('New appointment online')
                    ->view('emails.book-online-customer'); 
                    
    }
}
