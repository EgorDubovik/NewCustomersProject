<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendCustomerInvoice implements ShouldQueue
{
   use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

   /**
    * Create a new job instance.
    */
   protected $invoice;
   public $tries = 2;
   public $retryAfter = 20;

   public function __construct($invoice)
   {
      $this->invoice = $invoice;
   }

   /**
    * Execute the job.
    */
   public function handle(): void
   {
      Mail::to($this->invoice->email)->send(new InvoiceMail($this->invoice));
   }
}
