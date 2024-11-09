<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Mail\InvoiceMail;
use App\Models\Appointment;
use App\Models\InvoiceServices;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
// use PDF;
use Barryvdh\DomPDF\Facade\Pdf;


class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $invoices = Invoice::where('company_id',Auth::user()->company_id)
            ->orderBy('created_at','DESC')
            ->paginate(15);
        return view("invoice.index",['invoices' => $invoices]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request, Appointment $appointment)
    {
        Gate::authorize('create-invoice',['appointment' => $appointment]);
        
        list($tax, $total, $paid, $due) = $this->getTaxAndTotal($appointment);

        return view("invoice.create", [
            'appointment' => $appointment,
            'total'=>$total,
            'due' => $due,
            'tax' => $tax,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $appointment = Appointment::find($request->appointment_id);
        Gate::authorize('create-invoice',['appointment' => $appointment]);
        
        $invoice = Invoice::create([
            'creator_id'        => Auth::user()->id,
            'company_id'        => Auth::user()->company_id,
            'customer_id'       => $appointment->customer_id,
            'appointment_id'    => $appointment->id,
            'customer_name'     => $appointment->customer->name,
            'address'           => $appointment->address->full,
            'email'             => $appointment->customer->email,
            'status'            => 0,
            'pdf_path'          => null,
        ]);
        
        $pdfname = $this->createPDF($invoice);
        // return $pdfname;
        $invoice->pdf_path = $pdfname;
        $invoice->save();

        // send invocie
        $this->sendEmail($invoice);

        return redirect()->route('invoice.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        $this->authorize('can-view-invoice', $invoice);
        
        list($tax, $total, $paid, $due) = $this->getTaxAndTotal($invoice->appointment);
        
        return view('invoice.show',[
            'invoice' => $invoice,
            'total'=>$total,
            'due'=>$due,
            'tax'=>$tax,
        ]);
    }

    private function createPDF(Invoice $invoice){
        
        list($tax, $total, $paid, $due) = $this->getTaxAndTotal($invoice->appointment);
        
        $pdf = PDF::loadView('invoice.PDF',[
            'invoice' => $invoice,
            'total'=>$total,
            'due'=>$due,
            'tax'=>$tax
        ]);
        
        // return $pdf->stream('test',array('Attachment'=>false));
        $content = $pdf->download()->getOriginalContent();
        
        $filename = (env('APP_DEBUG') ? 'debug-' : "").'Invoice_'.date('m-d-Y').'-'.time().Str::random(50).'.pdf';
        Storage::disk('s3')->put('invoices/'.$filename, $content);
        return $filename;
    }

    public function resend(Request $request, Invoice $invoice)
    {
        $newInvoice = Invoice::create([
            'creator_id'    => $invoice->creator_id,
            'company_id'    => $invoice->company_id,
            'customer_id'   => $invoice->customer_id,
            'appointment_id'=> $invoice->appointment_id,
            'customer_name' => $invoice->customer_name,
            'address' => $invoice->address,
            'email' => $request->email,
            'status' => 0,
            'pdf_path' => null,
        ]);
        $pdfname = $this->createPDF($newInvoice);
        $newInvoice->pdf_path = $pdfname;
        $newInvoice->save();

        $this->sendEmail($invoice);

        return redirect()->route('invoice.index');
    }

    private function sendEmail(Invoice $invoice){
        $file = env('AWS_FILE_ACCESS_URL').'invoices/'.$invoice->pdf_path;
        Mail::to($invoice->email)->send(new InvoiceMail($invoice,$file));
    }

    private function getTaxAndTotal(Appointment $appointment){

        $tax = $appointment->totalTax();
        $total = $appointment->totalAmount();
        $total += $tax;
        $paid = $appointment->totalPaid();
        $due = $total - $paid;

        $due = ($due <= 0) ? '00.00' : number_format($due,2);
        $total = number_format($total,2); 
        $tax = number_format($tax,2);
        
        return [$tax, $total, $paid, $due];
    }

}
