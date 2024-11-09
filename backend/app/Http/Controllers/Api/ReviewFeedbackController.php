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
        
        if(!$invoice)
            return response()->json(['error' => 'Invoice not found'], 404);
        $invoice->company->logo = env('AWS_FILE_ACCESS_URL').$invoice->company->logo;
        $invoice->appointment->load('customer','services','payments', 'company');
        foreach($invoice->appointment->payments as $payment){
            $payment->payment_type = Payment::TYPE[$payment->payment_type - 1] ?? 'undefined';
        }

        $invoice->pdf_path = env('AWS_FILE_ACCESS_URL').'invoices/'.$invoice->pdf_path;
        $tax  = 0;
        $total = 0;
        foreach($invoice->appointment->services as $service){
            $total += $service->price;
            if($service->taxable)
                $tax += $service->price * ($invoice->company->settings->tax/100);
        }
        $invoice->appointment->tax = $tax;
        $invoice->appointment->total = $total+$tax;
        $invoice->review = CustomerReview::where('invoice_id', $invoice->id)->first();
        return response()->json(['invoice'=>$invoice], 200);   
    }

    public function store(Request $request, $invoiceKey){
        $request->validate([
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        $invoice = Invoice::where('key', $invoiceKey)->first();
        if(!$invoice)
            return response()->json(['error' => 'Invoice not found'], 404);

        $customerReview = CustomerReview::updateOrCreate(
        [
            'invoice_id' => $invoice->id,
        ],
        [
            'invoice_id' => $invoice->id,
            'customer_id' => $invoice->customer_id,
            'company_id' => $invoice->company_id,
            'tech_id' => $invoice->appointment->techs->first()->id,
            'rating' => $request->rating,
            'feedback' => $request->feedback,
        ]);
        return response()->json(['review'=>$customerReview], 200);
    }
}
