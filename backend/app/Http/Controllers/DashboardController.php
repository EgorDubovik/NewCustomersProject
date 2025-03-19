<?php

namespace App\Http\Controllers;

use App\Models\DailyPaymentsSum;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
   public function index()
   {
      return response()->json([], 404);
   }
}
