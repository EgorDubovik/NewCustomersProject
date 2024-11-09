<?php

namespace App\Http\Controllers;

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
    public function index(){

        $customers_count = Customer::where('company_id',Auth::user()->company_id)->count();
        
        $curentMonth = Carbon::now()->startOfMonth();
        DB::statement("SET SQL_MODE=''");
        $paymentsCurentMonth = Payment::where('created_at', '>=', $curentMonth)
            ->where('company_id',Auth::user()->company_id)
            ->groupBy('appointment_id')
            ->selectRaw('sum(amount) as sum')
            ->get();
        $sumCurentMonth = number_format($paymentsCurentMonth->sum('sum')/100,2);
        
        $paymentsLast30Days = Payment::where('created_at', '>=', Carbon::now()->subDays(30))
            ->where('company_id',Auth::user()->company_id)
            ->groupBy('appointment_id')
            ->selectRaw('sum(amount) as sum')
            ->get();
        
        $sumLast30Days = number_format($paymentsLast30Days->sum('sum')/100,2);
        $avarageLast30Days = number_format(round(($paymentsLast30Days->sum('sum')/100)/30,2),2);

        $currentDate = Carbon::now()->format('Y-m-d');
        $paymentsCurentDay = Payment::whereDate('created_at', $currentDate)->get();
        $sumCurentDay = number_format($paymentsCurentDay->sum('amount'),2);
        
        
        $appointments = Appointment::where('company_id',Auth::user()->company_id)->get();



        return view('dashboard',[
            'customers_count'=>$customers_count, 
            'appointments' => $appointments,
            'sumCurentMonth' => $sumCurentMonth,
            'sumCurentDay' => $sumCurentDay,
            'avarageLast30Days' => $avarageLast30Days,
        ]);
    }
}
