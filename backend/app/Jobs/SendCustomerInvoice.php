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
    protected $file;
    public $tries = 2;
    public $retryAfter = 20;

    public function __construct($invoice, $file)
    {
        $this->invoice = $invoice;
        $this->file = $file;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->invoice->email)->send(new InvoiceMail($this->invoice,$this->file));
        } catch (\Exception $e) {
            Log::error('Ошибка в задаче SendCustomerInvoice: ' . $e->getMessage(), [
                'exception' => $e
            ]);
    
            // Можно также пробросить исключение, если нужно
            throw $e;
        }
    }
}
