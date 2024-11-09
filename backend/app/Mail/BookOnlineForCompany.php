<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

class BookOnlineForCompany extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $appointment;
    public $headerTitle;
    public $company;
    
    public function __construct($appointment)
    {
        $this->appointment = $appointment;
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
        
        return $this->from($this->company->email,$this->company->name)
                    ->replyTo($this->company->email,$this->company->name)
                    ->subject('New appointment online')
                    ->markdown('emails.book-online-company');
                    
    }
}
