<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerReview;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Payment;

class ReviewFeedbackController extends Controller
{
   public function view(Request $request, $key)
   {
      $invoice = Invoice::where('key', $key)->first();

      if (!$invoice)
         return response()->json(['error' => 'Invoice not found'], 404);

      $invoice->load('job.customer', 'company');

      $invoice->review = CustomerReview::where('invoice_id', $invoice->id)->first();
      return response()->json(['invoice' => $invoice], 200);
   }

   public function store(Request $request, $invoiceKey)
   {
      $request->validate([
         'rating' => 'required|numeric|min:1|max:5',
      ]);

      $invoice = Invoice::where('key', $invoiceKey)->first();
      if (!$invoice)
         return response()->json(['error' => 'Invoice not found'], 404);

      $customerReview = CustomerReview::updateOrCreate(
         [
            'invoice_id' => $invoice->id,
         ],
         [
            'invoice_id' => $invoice->id,
            'customer_id' => $invoice->job->customer->id,
            'company_id' => $invoice->company_id,
            'tech_id' => $invoice->job->appointments->first()->techs->first()->id,
            'rating' => $request->rating,
            'feedback' => $request->feedback,
         ]
      );
      return response()->json(['review' => $customerReview], 200);
   }
}
