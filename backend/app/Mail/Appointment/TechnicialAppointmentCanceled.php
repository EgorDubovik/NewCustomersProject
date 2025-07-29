<?php

namespace App\Mail\Appointment;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Support\Facades\Log;
use App\Models\Appointment;

class TechnicialAppointmentCanceled extends Mailable
{
	use Queueable, SerializesModels;

	/**
	 * Create a new message instance.
	 */
	public $appointment;
	public $techName;
	public function __construct($appointment, $techName)
	{
		Log::info('test 12 constructor');
		$this->appointment = $appointment;
		$this->techName = $techName;
	}

	/**
	 * Get the message envelope.
	 */
	public function envelope(): Envelope
	{
		return new Envelope(
			from: new Address($this->appointment['company_email'], $this->appointment['company_name']),
			subject: 'Appointment Canceled',
		);
	}

	/**
	 * Get the message content definition.
	 */
	public function content(): Content
	{
		Log::info('test 12 content');

		return new Content(
			view: 'emails.appointment.technicial-appointment-canceled',
			with: [
				'appointmentStart' => $this->appointment['start'],
				'appointmentEnd' => $this->appointment['end'],
				'customerName' => $this->appointment['job_customer_name'],
				'customerAddress' => $this->appointment['job_customer_address'],
				'companyName' => $this->appointment['company_name'],
				'companyEmail' => $this->appointment['company_email'],
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
