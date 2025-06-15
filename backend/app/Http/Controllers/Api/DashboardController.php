<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailyPaymentsSum;
use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use App\Models\Payment;
use App\Models\Appointment;
use Carbon\Carbon;
use App\Models\Role;
use App\Models\Job\Job;

class DashboardController extends Controller
{
   public function dashboard(Request $request)
   {
      $user = $request->user();
      $isAmind = $user->isRole([Role::ADMIN]);
      $field = $isAmind ? 'company_id' : 'tech_id';
      $id = $isAmind ? $user->company_id : $user->id;

      $jobsForLast30Days = Job::where('company_id', $user->company_id)
         ->where('created_at', '>=', now()->subDays(30)->format('Y-m-d H:i:s'))
         ->count();

      $jobsForLastWeek = Job::where('company_id', $user->company_id)
         ->where('created_at', '>=', now()->subWeeks(1)->format('Y-m-d H:i:s'))
         ->count();


      $returnData = [
         'mainStat' => $this->getMainStat($field, $id),
         'daylyForCurrentWeek' => $this->getTotalForEachDayOfCurrWheek($field, $id),
         'lastSevenWeeks' => $this->getLastSevenWeeksStatistics($field, $id),
         'days' => $this->dailyPaymentsSum($field, $id),
      ];

      if ($isAmind) {
         $returnData['jobsForLast30Days'] = $jobsForLast30Days;
         $returnData['jobsForLastWeek'] = $jobsForLastWeek;
         $returnData['jobsAverageForDay'] = round(($jobsForLastWeek / 7 + $jobsForLast30Days / 30) / 2);
      }

      $returnData['appVersion'] = config('version.app_version');

      return response()->json($returnData, 200);
   }

   private function dailyPaymentsSum($field, $id)
   {
      $today = Carbon::today();
      $startOfWeek = $today->copy()->startOfWeek(); // Get Monday of this week
      $endOfWeek = $today->copy()->endOfWeek(); // Get Sunday of this week
      $days = [];

      while ($startOfWeek <= $endOfWeek) {
         $days[] = $startOfWeek->toDateString();
         $startOfWeek->addDay(); // Move to the next day
      }

      // foreach ($days as $day) {
      //    $dailyPaymentTotal = DailyPaymentsSum::where('date', $day)
      //       ->where($field, $id)
      //       ->get();

      //    if ($dailyPaymentTotal->isNotEmpty()) {
      //       $days[$day] = $dailyPaymentTotal->first()->total;
      //    } else {
      //       $days[$day] = 0;
      //    }
      // }

      return $days;
   }

   private function getMainStat($field, $id)
   {
      $currentMonth = Carbon::now()->startOfMonth();
      $currentWeek = Carbon::now()->startOfWeek();
      DB::statement("SET SQL_MODE=''");
      $paymentsCurrentMonth = Payment::where('created_at', '>=', $currentMonth)
         ->where($field, $id)
         ->get();
      $sumCurrentMonth = $paymentsCurrentMonth->sum('amount');

      $paymentsCurrentWheek = Payment::where('created_at', '>=', $currentWeek)
         ->where($field, $id)
         ->get();
      $sumCurrentWeek = $paymentsCurrentWheek->sum('amount');

      $currentDate = Carbon::now()->format('Y-m-d');
      $paymentsCurrentDay = Payment::whereDate('created_at', $currentDate)
         ->where($field, $id)
         ->get();
      $sumCurrentDay = $paymentsCurrentDay->sum('amount');

      return [
         'sumCurrentMonth' => $sumCurrentMonth,
         'sumCurrentWeek' => $sumCurrentWeek,
         'sumCurrentDay' => $sumCurrentDay,
      ];
   }

   private function getTotalForEachDayOfCurrWheek($field = 'tech_id', $id)
   {
      // Get the start of the week (Monday) and end of the week (Sunday)
      $startOfWeek = Carbon::now()->startOfWeek();
      $endOfWeek = Carbon::now()->endOfWeek();

      // Initialize an array with 7 zeros (one for each day of the week)
      $statistics = array_fill(0, 7, 0);

      // Query the payments for the current week grouped by day
      $payments = Payment::whereBetween('created_at', [$startOfWeek, $endOfWeek])
         ->where($field, $id)
         ->selectRaw('DAYOFWEEK(created_at) as weekday, SUM(amount) as total_amount')
         ->groupBy('weekday')
         ->pluck('total_amount', 'weekday'); // Pluck 'weekday' as key and 'total_amount' as value

      // Fill the statistics array with the amounts for each day
      foreach ($payments as $weekday => $totalAmount) {
         // DAYOFWEEK returns 1 for Sunday, 2 for Monday, ..., 7 for Saturday
         // Adjust index to fit the 0-based array: Monday = 0, ..., Sunday = 6
         $index = $weekday - 2; // Monday should be index 0
         if ($index < 0) {
            $index += 7; // Handle Sunday wrap-around
         }
         $statistics[$index] = round($totalAmount / 100, 2);
      }

      return $statistics;
   }

   private function getLastSevenWeeksStatistics($field, $id)
   {
      // Get the start of the current week
      $currentWeekStart = Carbon::now()->startOfWeek();

      // Initialize an array with 7 zeros (one for each week)
      $statistics = array_fill(0, 7, 0);

      // Query the payments for the last 7 weeks
      $payments = Payment::where('created_at', '>=', $currentWeekStart->copy()->subWeeks(6)) // Get payments from 6 weeks ago
         ->where($field, $id)
         ->selectRaw('YEARWEEK(created_at, 1) as week_number, SUM(amount) as total_amount')
         ->groupBy('week_number')
         ->pluck('total_amount', 'week_number'); // Pluck 'week_number' as key and 'total_amount' as value

      // Fill the statistics array
      for ($i = 0; $i < 7; $i++) {
         // Calculate the week number for each of the last 7 weeks
         $weekNumber = $currentWeekStart->copy()->subWeeks($i)->format('oW'); // oW: Year + Week number
         // $statistics[6 - $i] = round($payments[$weekNumber] / 100, 2) ?? 0; // Populate the array (6 - $i for reverse order)
         $statistics[6 - $i] = round(($payments[$weekNumber] ?? 0) / 100, 2); // Populate the array (6 - $i for reverse order)
      }

      return $statistics;
   }
}
