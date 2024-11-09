<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Payment;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\InvoiceMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\User;
use App\Services\InvoiceService;

class InvoiceController extends Controller
{
    public function index(Request $request){
        
        // !! В слючае удаления апойнтмента, должен остатся, для этого нужно все данные сохронять отдельно а не высчитвать, а именно сумму

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $invoices = Invoice::where('company_id',Auth::user()->company_id)
            ->where(function($query) use ($user){
                if(!$user->isRole([Role::ADMIN,Role::DISP]))
                    $query->where('creator_id',Auth::user()->id);
            })->with(['job','job.customer','job.address','creator'])
            ->orderBy('created_at','DESC')
            ->paginate($request->limit ?? 10);
        return response()->json(['invoices' => $invoices], 200);
    }

    public function create(Request $request, $appointment_id){
        $appointment = Appointment::find($appointment_id);
        if(!$appointment)
            return response()->json(['error' => 'Appointment not found'], 404);

        Gate::authorize('create-invoice',['appointment' => $appointment]);

        $invoice = $this->getInvoiceInfo($appointment);

        return response()->json(['invoice'=>$invoice], 200);
    }

    public function send(Request $request, $appointment_id){

        $appointment = Appointment::find($appointment_id);
        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found'], 404);
        }

        Gate::authorize('create-invoice', ['appointment' => $appointment]);
        $invoiceService = new InvoiceService();
        try {
            $invoiceService->sendInvoice($appointment);
            return response()->json(['success' => 'success'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
        
    }

    function download(Request $request, $appointment_id){

        $appointment = Appointment::find($appointment_id);
        if(!$appointment)
            return response()->json(['error' => 'Appointment not found'], 404);

        $this->authorize('create-invoice',['appointment' => $appointment]);
        
        $invoice = $this->getInvoiceInfo($appointment);
        $pdf = PDF::loadView('invoice.PDF',['invoice' => $invoice]);
        
        return $pdf->stream('invoice.pdf');
    }

    private function getInvoiceInfo($appointment = null, $invoice = null){
        if($appointment){
            $invoice = new Invoice();
            $invoice->id = Invoice::count() + 1;
            $invoice->job = $appointment->job->load(['services','payments','customer','address']);
            $invoice->company = $appointment->company;
            $invoice->created_at = now();
            $invoice->email = $appointment->job->customer->email;
            return $invoice;
        }
        return $invoice;
    }
}
