<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $invoice;
    public $referralCode = null;
    public $headerTitle;
    public $company;
    
    public function __construct($invoice)
    {
        $this->invoice = $invoice;
        $this->headerTitle = 'Invoice';
        $this->company = $invoice->company;
        // $this->referralCode = $this->getReferralCode();
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    
    public function build()
    {
        return $this->view('emails.invoice-v2')
                    ->subject('New invoice')
                    ->attach($this->invoice->pdf_path,[
                        'as' => $this->invoice->pdf_path,
                        'mime' => 'application/pdf'
                    ])
                    ->replyTo($this->company->email,$this->company->name)
                    ->from($this->company->email,$this->company->name);
    }

    // private function getReferralCode(){

    //     if(!$this->invoice->appointment->customer->referralCode)
    //         $this->invoice->appointment->customer->referralCode = ReferalLinksCode::create([
    //             'company_id' => $this->invoice->appointment->company_id,
    //             'customer_id' => $this->invoice->appointment->customer_id,
    //             'code' => Str::random(10),
    //         ]);

    //     return $this->invoice->appointment->customer->referralCode->code;
    // }
}
