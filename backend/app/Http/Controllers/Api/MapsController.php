<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Carbon\Carbon;


class MapsController extends Controller
{
   public function todays(Request $request)
   {
      $now = Carbon::today()->startOfDay();
      $endOfDay = Carbon::today()->endOfDay();

      $appointments = Appointment::where("company_id", $request->user()->company_id)
         ->whereBetween('start', [$now, $endOfDay])
         ->with(['job.customer', 'job.address', 'techs'])
         ->orderBy('start')
         ->get();

      return response()->json(['appointments' => $appointments], 200);

   }
}
