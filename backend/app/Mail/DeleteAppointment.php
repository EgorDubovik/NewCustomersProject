<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;
use App\Models\Appointment;

class DeleteAppointment extends Mailable
{
    use Queueable, SerializesModels;
    
    public $headerTitle = 'Appointment canceled';
    public $company;
    /**
     * Create a new message instance.
     */
    public function __construct(public Appointment $appointment)
    {
        $this->company = $appointment->company;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address($this->appointment->company->email, $this->appointment->company->name),
            subject: 'Appointment canceled',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.appointment.cancaled',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
