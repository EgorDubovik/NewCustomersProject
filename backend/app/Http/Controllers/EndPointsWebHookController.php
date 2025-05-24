<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanySettings\EndPointToken;
use App\Models\Appointment;

class EndPointsWebHookController extends Controller
{
	public function getAppointmentInfo(Request $request)
	{
		$token = $request->bearerToken();

		$endPointToken = EndPointToken::where('token', $token)->first();

		if (!$endPointToken) {
			return response()->json([
				'status' => 'error',
				'message' => 'Invalid token',
			], 401);
		}

		// Get all appointments from now 
		$appointments = Appointment::where('company_id', $endPointToken->company_id)
			->where('start', '>=', now()->format('Y-m-d H:i:s'))
			->get();



		$returnData = [];
		foreach ($appointments as $appointment) {
			$returnData[] = [
				'startTime' => $appointment->start,
				'endTime' => $appointment->end,
				'techs' => $appointment->techs->map(function ($tech) {
					return [
						'id' => $tech->id,
						'name' => $tech->name,
					];
				})->toArray(),
			];
		}

		return response()->json($request);
	}
}
