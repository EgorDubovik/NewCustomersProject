<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EndPointsWebHookController extends Controller
{
	public function getAppointmentInfo(Request $request)
	{
		$token = $request->bearerToken();

		return response()->json([
			'status' => 'success',
			'message' => 'Appointment info',
			'data' => $request->all(),
			'token' => $token,
		]);
	}
}
