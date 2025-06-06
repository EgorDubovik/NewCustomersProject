<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendTechNotifOnAttachAppointment;
use App\Mail\DeleteAppointment;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Job\Job;
use App\Models\Role;
use Illuminate\Support\Facades\Log;


class AppointmentController extends Controller
{

	public function index(Request $request)
	{
		$appointments = Appointment::with(['job.customer', 'techs'])
			->where('company_id', $request->user()->company_id)
			->where(function ($query) use ($request) {
				if (!$request->user()->isRole([Role::ADMIN, Role::DISP])) {
					$query->whereHas('techs', function ($query) use ($request) {
						$query->where('tech_id', $request->user()->id);
					});
				}

			})
			->get();

		$returnAppointments = $appointments->map(function ($appointment) {
			return [
				'id' => $appointment->id,
				'start' => $appointment->start,
				'end' => $appointment->end,
				'title' => $appointment->job->customer->name,
				'status' => $appointment->status,
				'techs' => $appointment->techs,
				// 'backgroundColor' => $appointment->techs->first()->color ?? '#1565c0',

			];
		});

		return response()->json(['appointments' => $returnAppointments], 200);
	}

	public function active(Request $request)
	{
		$appointments = Appointment::with(['job.customer', 'techs'])
			->where('company_id', $request->user()->company_id)
			->where(function ($query) use ($request) {
				if (!$request->user()->isRole([Role::ADMIN, Role::DISP])) {
					$query->whereHas('techs', function ($query) use ($request) {
						$query->where('tech_id', $request->user()->id);
					});
				}

			})
			->where(function ($query) {
				$query->where('status', Appointment::ACTIVE)
					->orWhere('status', Appointment::ON_MY_WAY);
			})
			->get();


		return response()->json(['appointments' => $appointments], 200);
	}

	public function view(Request $request, $id)
	{
		$appointment = Appointment::find($id);

		if (!$appointment)
			return response()->json(['error' => 'Appointment not found'], 404);

		$this->authorize('view-appointment', $appointment);

		$appointment->title = $appointment->job->customer->name;
		// $appointment->backgroundColor = $appointment->techs->first()->color ?? '#1565c0';
		$appointment->customer = $appointment->job->customer;
		$appointment->customer->loadCount('jobs');

		$appointment->address = $appointment->job->address->full ?? '';
		$appointment->techs = $appointment->techs->load('roles');
		$appointment->notes = $appointment->job->notes()
			->with(['creator:id,name'])
			->orderBy('created_at', 'desc') // Sort by created_at in ascending order
			->get(['id', 'text', 'updated_at', 'creator_id'])
			->map(function ($note) {
				return [
					'id' => $note->id,
					'text' => $note->text,
					'updated_at' => $note->updated_at,
					'creator' => [
						'id' => $note->creator->id,
						'name' => $note->creator->name,
					],
				];
			});
		$appointment->expenses = $appointment->job->expenses;
		$appointment->job->load([
			'invoices',
			'tags',
			'appointments' => function ($query) {
				$query->orderBy('start', 'desc');
			},
			'appointments.techs'
		]);
		$appointment->images = $appointment->job->images;


		return response()->json(['appointment' => $appointment], 200);
	}

	public function store(Request $request)
	{
		$validate = $request->validate([
			'customerId' => 'required|integer',
			'addressId' => 'required|integer',
			'timeFrom' => 'required',
			'timeTo' => 'required',
		]);

		$this->authorize('make-appointment', [$request->customerId, $request->addressId]);

		DB::beginTransaction();
		try {
			$startTime = Carbon::parse($request->timeFrom)->setSecond(0);
			$endTime = Carbon::parse($request->timeTo)->setSecond(0);
			$job = Job::create([
				'company_id' => $request->user()->company_id,
				'customer_id' => $request->customerId,
				'address_id' => $request->addressId,
			]);
			$appointment = Appointment::create([
				'start' => $startTime,
				'end' => $endTime,
				'status' => 0,
				'job_id' => $job->id,
				'company_id' => $request->user()->company_id,
			]);

			// add techs to appointment
			foreach ($request->techs as $tech) {
				$appointment->techs()->attach($tech);
			}

			// Add services to job
			if ($request->has('services')) {
				foreach ($request->services as $service) {
					$job->services()->create([
						'title' => $service['title'],
						'description' => $service['description'],
						'price' => $service['price'],
						'taxable' => $service['taxable'],
					]);
				}
			}
			//send notification to techs
			$techEmails = $appointment->techs->pluck('email')->toArray();
			SendTechNotifOnAttachAppointment::dispatch($appointment, $techEmails);
			DB::commit();
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['error' => 'Error creating appointment'], 500);
		}

		return response()->json(['message' => 'Appointment created', 'appointment' => $appointment], 200);
	}

	public function update(Request $request, $id)
	{
		$appointment = Appointment::find($id);
		if (!$appointment)
			return response()->json(['error' => 'Appointment not found'], 404);

		$this->authorize('update-remove-appointment', $appointment);

		if ($request->has('timeFrom'))
			$appointment->start = Carbon::parse($request->timeFrom);
		if ($request->has('timeTo'))
			$appointment->end = Carbon::parse($request->timeTo);

		$appointment->save();

		return response()->json(['message' => 'Appointment updated'], 200);
	}

	public function delete(Request $request, $id)
	{
		$appointment = Appointment::find($id);
		if (!$appointment)
			return response()->json(['error' => 'Appointment not found'], 404);

		$this->authorize('update-remove-appointment', $appointment);

		// Sending notification to techs that appointment is deleted
		foreach ($appointment->techs as $tech) {
			// $tech->notify(new DeleteAppointment($appointment));
		}

		$appointment->techs()->detach();
		$job = $appointment->job;
		$appointment->delete();

		// Delete job if no appointments
		if ($job->appointments->count() == 0) {
			$job->services()->delete();
			$job->notes()->delete();
			$job->expenses()->delete();
			$job->images()->delete();

			$job->delete();
		}

		return response()->json(['message' => 'Appointment deleted'], 200);
	}

	// Appointment status
	public function updateStatus(Request $request, $id)
	{
		$appointment = $this->isValidAppointment($id);

		$this->authorize('update-remove-appointment', $appointment);

		// Geting current status
		$currentStatus = $appointment->status;

		// New status geting next from array
		$index = array_search($currentStatus, Appointment::STATUS, true);
		if ($index === false) {
			throw new InvalidArgumentException("Invalid status provided");
		}

		$nextIndex = ($index + 1) % count(Appointment::STATUS);

		$appointment->update([
			'status' => Appointment::STATUS[$nextIndex],
		]);

		return response()->json(['message' => 'Appointment status updated', 'new_status' => Appointment::STATUS[$nextIndex]], 200);
	}

	// Appointment Techs
	public function removeTech(Request $request, $appointment_id, $tech_id)
	{
		$appointment = $this->isValidAppointment($appointment_id);

		$this->authorize('add-tech-to-appointment', [$appointment, $tech_id]);

		$appointment->techs()->detach($tech_id);

		return response()->json(['message' => 'Tech removed from appointment'], 200);
	}

	public function addTech(Request $request, $appointment_id)
	{
		$appointment = $this->isValidAppointment($appointment_id);

		$appointment->techs()->detach();
		foreach ($request->techs as $tech_id) {
			$this->authorize('add-tech-to-appointment', [$appointment, $tech_id]);

			$appointment->techs()->attach($tech_id);
		}

		return response()->json(['message' => 'Tech added to appointment'], 200);
	}

	// Create copy of appointment
	public function copy(Request $request, $appointment_id)
	{
		$appointment = $this->isValidAppointment($appointment_id);
		$this->authorize('update-remove-appointment', $appointment);

		$newAppointment = $appointment->replicate();
		$newAppointment->start = Carbon::parse($request->timeFrom)->setSecond(0);
		$newAppointment->end = Carbon::parse($request->timeTo)->setSecond(0);
		$newAppointment->status = Appointment::ACTIVE;
		$newAppointment->save();

		// copy techs to new appointment
		foreach ($appointment->techs as $tech) {
			$newAppointment->techs()->attach($tech->id);
		}

		// Finish current appointment id selected
		if ($request->isFinishCurerentAppointment) {
			$appointment->update([
				'status' => Appointment::DONE,
			]);
		}

		return response()->json(['message' => 'Appointment copied', 'appointment' => $newAppointment], 200);
	}


	private function isValidAppointment($appointment_id)
	{
		$appointment = Appointment::find($appointment_id);
		if (!$appointment)
			return response()->json(['error' => 'Appointment not found'], 404);
		return $appointment;
	}

	// return active appointments for user
	public static function getActiveAppointments($user_id)
	{
		$appointments = Appointment::where('status', Appointment::ACTIVE)
			->whereHas('techs', function ($query) use ($user_id) {
				$query->where('tech_id', $user_id);
			})
			->get();

		return $appointments;

	}
}
