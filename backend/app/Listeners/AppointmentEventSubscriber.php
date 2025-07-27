<?php

namespace App\Listeners;

use App\Events\AppointmentCreated;
use App\Events\AppointmentUpdated;
use App\Events\AppointmentCancelled;
use App\Jobs\SendTechNotifOnAttachAppointment;
use Illuminate\Support\Facades\Log;

class AppointmentEventSubscriber
{
	public function onAppointmentCreated(AppointmentCreated $event)
	{
		Log::info('Appointment created: ' . $event->appointment->id);
		//send notification to all assigned techs
		$techEmails = $event->appointment->techs->pluck('email')->toArray();
		Log::info($techEmails);
		//SendTechNotifOnAttachAppointment::dispatch($event->appointment, $techEmails);
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
		Log::info('Appointment cancelled: ' . $event->appointment->id);
		//send notification to all assigned techs
		$techEmails = $event->appointment->techs->pluck('email')->toArray();
		Log::info($techEmails);
		//SendTechNotifOnAttachAppointment::dispatch($event->appointment, $techEmails);
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
