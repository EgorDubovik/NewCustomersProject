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
use App\Http\Resources\PaymentResource;
use App\Http\Resources\TechPaymentsResource;

class PaymentController extends Controller
{

   public function index(Request $request)
   {

      $endDate = ($request->endDate) ? Carbon::parse($request->endDate)->endOfDay() : Carbon::now()->endOfDay();
      $startDate = ($request->startDate) ? Carbon::parse($request->startDate)->startOfDay() : Carbon::now()->subDays(31)->startOfDay();

      // Получаем все платежи в диапазоне
      $payments = Payment::whereBetween('created_at', [$startDate, $endDate])
         ->where('company_id', $request->user()->company_id)
         ->where(function ($query) use ($request) {
            if (!$request->user()->isRole([Role::ADMIN, Role::DISP]))
               $query->where('tech_id', $request->user()->id);
         })
         ->with('job')
         ->with('tech')
         ->orderBy('created_at', 'desc')
         ->get();

      $groupedPayments = $payments->groupBy(function ($payment) {
         return $payment->tech_id . '_' . $payment->created_at->toDateString();
      });

      // Подсчет по типу платежа
      $totalByType = $payments->groupBy('payment_type')->map(function ($group) {
         return $group->sum('amount');
      });

      // Получаем всех техников
      $techIds = $payments->pluck('tech_id')
         ->unique();
      $techs = User::whereIn('id', $techIds)->get()->keyBy('id');

      // Получаем все даты в диапазоне
      $dates = collect(CarbonPeriod::create($startDate, $endDate->copy()))
         ->map(fn($date) => $date->toDateString());

      // Группируем платежи по дате и технику
      $grouped = $payments->groupBy(function ($payment) {
         return $payment->tech_id . '_' . $payment->created_at->toDateString();
      });

      $data = [];
      foreach ($techIds as $techId) {
         $tech = $techs[$techId];

         $amounts = $dates->map(function ($date) use ($grouped, $techId) {
            $key = $techId . '_' . $date;
            return $grouped->get($key)?->sum('amount') ?? 0;
         });

         $data[] = [
            'tech' => TechPaymentsResource::make($tech),
            'amounts' => $amounts,
         ];
      }

      return response()->json([
         'totalByType' => $totalByType,
         'payments' => PaymentResource::collection($payments),

         'techsPaymentsByDate' => ['dates' => $dates, 'techs' => $data],
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
         if (!$job->customer->email)
            return response()->json(['payment' => $payment, 'info' => 'Customer email not found. Invoice was not sent'], 200);
         try {
            $invoiceService = new InvoiceService();
            $invoiceService->sendInvoice($job->appointments->first());
         } catch (\Exception $e) {
            return response()->json(['payment' => $payment, 'info' => $e->getMessage()], 200);
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
