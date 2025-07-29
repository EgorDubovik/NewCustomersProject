<?php

namespace App\Listeners;

use App\Events\AppointmentCreated;
use App\Events\AppointmentUpdated;
use App\Events\AppointmentCancelled;
use App\Jobs\SendTechNotifOnAttachAppointment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\Appointment\TechnicialAppointmentAssigned;
use App\Mail\Appointment\TechnicialAppointmentCanceled;


class AppointmentEventSubscriber
{
	public function onAppointmentCreated(AppointmentCreated $event)
	{


		// Send email to all techs
		foreach ($event->appointment->techs as $tech) {
			if ($tech->email)
				Mail::to($tech->email)->queue(new TechnicialAppointmentAssigned($event->appointment, $tech->name));
		}

		// Send email to customer
		// if ($event->appointment->job->customer->email)
		// 	Mail::to($event->appointment->job->customer->email)->queue(new TechnicialAppointmentAssigned($event->appointment, $event->appointment->job->customer->name));

		// Send SNS to customer
		// 
	}

	public function onAppointmentUpdated(AppointmentUpdated $event)
	{
		Log::info('Appointment updated: ' . $event->appointment->id);
		//send notification to all assigned techs
		$techEmails = $event->appointment->techs->pluck('email')->toArray();
		Log::info($techEmails);
		//SendTechNotifOnAttachAppointment::dispatch($event->appointment, $techEmails);
	}

	public function onAppointmentCancelled(AppointmentCancelled $event)
	{

		//send notification to all assigned techs
		$appointment = $event->appointment->load([
			'job.address', // для full address
			'company',
		]);

		// Собираем только нужные данные
		$appointmentData = [
			'id' => $appointment->id,
			'start' => $appointment->start,
			'end' => $appointment->end,
			'job_customer_name' => $appointment->job->customer->name ?? '',
			'job_customer_address' => $appointment->job->address->full ?? '',
			'company_name' => $appointment->company->name ?? '',
			'company_email' => $appointment->company->email ?? '',
		];

		foreach ($event->appointment->techs as $tech) {
			if ($tech->email) {
				$techName = $tech->name;
				Mail::to($tech->email)->queue(new TechnicialAppointmentCanceled($appointmentData, $techName));
			}
		}

	}

	public function subscribe($events)
	{
		$events->listen(
			AppointmentCreated::class,
			[AppointmentEventSubscriber::class, 'onAppointmentCreated']
		);
		$events->listen(
			AppointmentUpdated::class,
			[AppointmentEventSubscriber::class, 'onAppointmentUpdated']
		);
		$events->listen(
			AppointmentCancelled::class,
			[AppointmentEventSubscriber::class, 'onAppointmentCancelled']
		);
	}
}
