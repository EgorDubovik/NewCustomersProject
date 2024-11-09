<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use Carbon\CarbonPeriod;
use App\Models\Job\Job;
use App\Models\Role;
use App\Services\InvoiceService;

class PaymentController extends Controller
{

   public function index(Request $request)
   {

      $endDate = ($request->endDate) ? Carbon::parse($request->endDate) : Carbon::now();
      $startDate = ($request->startDate) ? Carbon::parse($request->startDate) : Carbon::now()->subDays(31);

      $datesInRange = CarbonPeriod::create($startDate, $endDate->copy());
      $paymentForGraph = [];
      $techs_id = [];
      foreach ($datesInRange as $date) {
         $formattedDate = $date->toDateString();
         $payments = Payment::where('company_id', $request->user()->company_id)
            ->where(function ($query) use ($request) {
               if (!$request->user()->isRole([Role::ADMIN, Role::DISP]))
                  $query->where('tech_id', $request->user()->id);
            })
            ->whereDate('created_at', $formattedDate)
            ->with('job.customer')
            ->with('job.appointments')
            ->get();
         foreach ($payments as $payment) {
            if (!in_array($payment->tech_id, $techs_id))
               $techs_id[] = $payment->tech_id;
         }

         $paymentForGraph[] = [
            'payments' => $payments,
            'date' => $formattedDate,
         ];
      }

      $techs = [];
      foreach ($techs_id as $tech_id) {
         $tech = User::find($tech_id);
         if ($tech) {
            $techs[] = $tech;
         }
      }

      return response()->json([
         'paymentForGraph' => $paymentForGraph,
         'techs' => $techs,
      ], 200);
   }

   public function store(Request $request, $job_id)
   {
      $job = Job::find($job_id);
      if (!$job)
         return response()->json(['error' => 'Job not found'], 404);

      $this->authorize('pay-job', $job);

      $request->validate([
         'amount' => 'required|numeric',
      ]);

      $paymentType = 0;
      foreach (Payment::TYPE as $key => $type) {
         if (Str::lower($type) == Str::lower($request->payment_type)) {
            $paymentType = $key + 1;
            break;
         }
      }

      $payment = $job->payments()->create([
         'amount' => $request->amount,
         'payment_type' => $paymentType,
         'company_id' => $request->user()->company_id,
         'tech_id' => $request->user()->id,
      ]);

      if ($request->send_invoice) {
         $invoiceService = new InvoiceService();
         try {
            $invoiceService->sendInvoice($job->appointments->first());
         } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
         }
      }

      return response()->json(['payment' => $payment], 200);
   }

   public function delete(Request $request, $payment_id)
   {
      $payment = Payment::find($payment_id);
      if (!$payment)
         return response()->json(['error' => 'Payment not found'], 404);

      $this->authorize('payment-remove', $payment);

      $payment->delete();

      return response()->json(['message' => 'Payment deleted'], 200);
   }

   public function refund(Request $request, $job_id)
   {
      $job = Job::find($job_id);
      if (!$job)
         return response()->json(['error' => 'Job not found'], 404);

      $this->authorize('refund', $job);

      $request->validate([
         'amount' => 'required|numeric',
      ]);

      $paymentType = 0;
      foreach (Payment::TYPE as $key => $type) {
         if (Str::lower($type) == Str::lower($request->payment_type)) {
            $paymentType = $key + 1;
            break;
         }
      }

      $payment = $job->payments()->create([
         'amount' => $request->amount * -1,
         'payment_type' => $paymentType,
         'company_id' => $request->user()->company_id,
         'tech_id' => $request->user()->id,
      ]);

      return response()->json(['payment' => $payment], 200);
   }
}
