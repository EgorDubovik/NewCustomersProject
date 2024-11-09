<?php

namespace App\Services;

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
         $pdfname = $this->createPDF($invoice); // Create PDF
         $invoice->pdf_path = $pdfname;
         $key = Str::random(50);
         $invoice->key = $key;

         $invoice->save();

         $this->sendEmail($invoice); // Send Email

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
      $filename = (env('APP_DEBUG') ? 'debug-' : "").'Invoice_'.date('m-d-Y').'-'.time().Str::random(50).'.pdf';
      Storage::disk('s3')->put('invoices/'.$filename, $content);
      return $filename;
   }

   protected function sendEmail($invoice)
   {
      $file = $invoice->pdf_url;
      Mail::to($invoice->email)->send(new InvoiceMail($invoice,$file));
   }
}
