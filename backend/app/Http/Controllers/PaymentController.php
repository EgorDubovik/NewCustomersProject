<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class PaymentController extends Controller
{

    public function index(Request $request){
        
        $endDate = ($request->endDate) ? Carbon::parse($request->endDate) : Carbon::now();
        $startDate = ($request->startDate) ? Carbon::parse($request->startDate) : Carbon::now()->subDays(31);
        
        $paymentsSelectedRange = Payment::whereHas('appointment', function ($query) {
            $query->where('company_id', Auth::user()->company_id);
        })
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<=', $endDate)
            ->get()
            ->sortDesc();
        
        $paymentsSelectedRange->map(function($item){
            $item->date = $item->created_at->format('Y-m-d');
            return $item;
        });      

        $datesInRange = CarbonPeriod::create($startDate,$endDate->copy()->addDay());
        $paymentForGraph = [];
        $mainTotal = 0;
        foreach ($datesInRange as $date) {
            $formattedDate = $date->toDateString();
            $total = $paymentsSelectedRange->where('date',$formattedDate)->sum('amount');
            $mainTotal += $total;
            $paymentForGraph[] = [
                'day' => $formattedDate,
                'total' => $total,
            ];
        }
        $total = array();
        $total['main'] = $mainTotal;
        $total['credit'] = $paymentsSelectedRange->where('payment_type',Payment::CREDIT)->sum('amount');
        $total['transfer'] = $paymentsSelectedRange->where('payment_type',Payment::TRANSFER)->sum('amount');
        $total['cash'] = $paymentsSelectedRange->where('payment_type',Payment::CASH)->sum('amount');
        $total['check'] = $paymentsSelectedRange->where('payment_type',Payment::CHECK)->sum('amount');

        return view('payment.index',[
            'paymentForGraph'   => $paymentForGraph,
            'total'             => $total,
            'period'            => ['startDate' => $startDate->format('m-d-Y'),'endDate' => $endDate->format('m-d-Y')],
            'payments'          => $paymentsSelectedRange,
        ]);
    }

    public function store(Request $request, Appointment $appointment){
        
        Gate::authorize('pay-service',['appointment' => $appointment]);
        $this->validate($request,[
            'amount' => 'required|numeric|min:1',
        ]);

        Payment::create([
            'appointment_id'    => $appointment->id,
            'amount'            => $request->amount,
            'payment_type'      => $request->payment_type,
            'company_id'        => Auth::user()->company_id,
        ]);

        return back();
    }

    public function refund(Request $request, Appointment $appointment){
        
        Gate::authorize('pay-service',['appointment' => $appointment]);
        $this->validate($request,[
            'amount' => 'required|numeric|min:1',
        ]);

        $ammount = $request->amount*-1;
        Payment::create([
            'appointment_id'    => $appointment->id,
            'amount'            => $ammount,
            'payment_type'      => $request->payment_type,
            'company_id'        => Auth::user()->company_id,
        ]);

        return back();
    }

    public function delete(Payment $payment){

        Gate::authorize('payment-remove',['payment'=>$payment]);
        $payment->delete();

        return back();
    }
}
