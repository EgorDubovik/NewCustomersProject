<?php

namespace App\Services;

use App\Jobs\SendCustomerInvoice;
use App\Models\Appointment;
use App\Models\Invoice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceMail;

class InvoiceService
{

   public function sendInvoice(Appointment $appointment)
   {
      if (!$appointment) {
         throw new \Exception('Appointment not found');
      }

      DB::beginTransaction();
      try {
         $invoice = new Invoice();
         $invoice->company_id = $appointment->company_id;
         $invoice->creator_id = Auth::user()->id;
         $invoice->job_id = $appointment->job_id;
         $invoice->email = $appointment->job->customer->email;
         $invoice->pdf_path = $this->createPDF($invoice); // Create PDF
         $key = Str::random(50);
         $invoice->key = $key;
         $invoice->save();
         
         // Send email
         SendCustomerInvoice::dispatch($invoice);

         DB::commit();
      } catch (\Exception $e) {
         DB::rollBack();
         throw new \Exception($e->getMessage());
      }
   }

   protected function createPDF(Invoice $invoice)
   {
      $pdf = PDF::loadView('invoice.PDF',['invoice' => $invoice]);
      $content = $pdf->download()->getOriginalContent();
      $file_path = 'invoices/'.(env('APP_DEBUG') ? 'debug/' : "").'Invoice_'.date('m-d-Y').'-'.time().Str::random(50).'.pdf';
      Storage::disk('s3')->put($file_path, $content);
      return env('AWS_FILE_ACCESS_URL').$file_path;
   }
}
