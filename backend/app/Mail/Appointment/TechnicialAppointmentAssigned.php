<?php

namespace App\Mail\Appointment;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class TechnicialAppointmentAssigned extends Mailable
{
	use Queueable, SerializesModels;

	public $appointment;
	public $techName;
	/**
	 * Create a new message instance.
	 */
	public function __construct($appointment, $techName)
	{
		$this->appointment = $appointment;
		$this->techName = $techName;
	}

	/**
	 * Get the message envelope.
	 */
	public function envelope(): Envelope
	{
		return new Envelope(
			from: new Address($this->appointment->company->email, $this->appointment->company->name),
			subject: 'Appointment Assigned',
		);
	}

	/**
	 * Get the message content definition.
	 */
	public function content(): Content
	{
		return new Content(
			view: 'emails.appointment.technicial-appointment-assigned',
			with: [
				'appointment' => $this->appointment,
				'techName' => $this->techName,
			],
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
