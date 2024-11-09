<?php

namespace App\Http\Controllers;

use App\Mail\BookOnline;
use App\Mail\BookOnlineForCompany;
use App\Models\Addresses;
use App\Models\Appointment;
use App\Models\BookAppointment;
use App\Models\BookAppointmentProvider;
use App\Models\AppointmentService;
use App\Models\BookOnlineCounterStatistics;
use App\Models\Customer;
use App\Models\Service;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class BookAppointmentController extends Controller
{
    public function index(Request $request, $key){
        $company = BookAppointment::where('key',$key)
                                    ->where('active',1)
                                    ->first();
        if(!$company)
            return abort(404);
        
        $agent = new \Jenssegers\Agent\Agent;

        $device_type = $agent->isMobile() ? 'mobile' : 'desctop';
        
        BookOnlineCounterStatistics::create([
            'book_online_id' => $company->id,
            'prev_url' => ($request->prev) ? $request->prev : "null",
            'device_type' => $device_type,
            'ip' => $request->ip(),
        ]);
        
        return view('book-appointment.index',['company' => $company->company,'key' => $key]);
    }

    public function store(Request $request, $key){
        $company = BookAppointment::where('key',$key)->first();
        if(!$company)
            return abort(404);
        
        $request->validate([
            'phone_number' => 'required',
            'address_line1' => 'required',
        ],[
            'phone_number.required' => 'Please fill your phone number',
            'address_line1.required' => 'Please fill at least first line of address',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone_number,
            'email' => $request->email,
            'company_id' => $company->company_id,
        ]);

        $address = Addresses::create([
            'line1' => $request->address_line1,
            'line2' => $request->address_line2,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'customer_id' => $customer->id,
        ]);

        $startTime = Carbon::createFromFormat('Y-m-d H:i',  $request->datetime);
        $endTime = $startTime->copy()->addHours(2);

        $appointment = Appointment::create([
            'customer_id' => $customer->id,
            'company_id' => $company->company_id,
            'address_id' => $address->id,
            'start' => $startTime,
            'end' => $endTime,
        ]);

        if($request->has('service')){
            foreach($request->input('service') as $key => $value){
                $company_service = Service::where('company_id',$company->id)
                                        ->where('id',$value)->first();
                if($company_service){                        
                    AppointmentService::create([
                        'appointment_id' => $appointment->id,
                        'title' => $company_service->title,
                        'description' => $company_service->description,
                        'price' => $company_service->price,
                    ]);
                }
            }
        }

        $key = Str::random(40);
        while(BookAppointmentProvider::where('key', $key)->exists()) {
            $key = Str::random(40);
        }
        
        $bookAppointmentProvider = BookAppointmentProvider::create([
            'appointment_id'    => $appointment->id,
            'key'               => $key,
        ]);
        
        

        if($request->has('email'))
            Mail::to($request->email)->send(new BookOnline($appointment,$bookAppointmentProvider->key));
        if($appointment->company->email)
            Mail::to($appointment->company->email)->send(new BookOnlineForCompany($appointment));

        return redirect('appointment/book/view/'.$bookAppointmentProvider->key);
    }

    public function view(Request $request, $key){

        $bookAppointmentProvider = BookAppointmentProvider::where('key',$key)->first();

        if(!$bookAppointmentProvider)
            abort(404);
        
        return view('book-appointment.show',['appointment'=>$bookAppointmentProvider->appointment,'key'=>$key]);
    }

    public function delete(Request $request, $key){
        
        $bookAppointmentProvider = BookAppointmentProvider::where('key',$key)->first();

        if(!$bookAppointmentProvider)
            abort(404);
        

        $bookAppointment = BookAppointment::where('company_id',$bookAppointmentProvider->appointment->company_id)->first();
        $key = ($bookAppointment) ? $bookAppointment->key : null;
        $appointment = $bookAppointmentProvider->appointment;
        $appointment->services()->delete();
        $appointment->appointmentTechs()->delete();
        $appointment->delete();
        $bookAppointmentProvider->delete();

        return redirect('/appointment/book/delete/complete')->with('key',$key);
    }

    public function remove(Request $request){
        $key = $request->session()->get('key');
        $company = BookAppointment::where('key',$key)
                                    ->where('active',1)
                                    ->first();
        if(!$company)
            return abort(404);

        return view('book-appointment.delete',['company' => $company->company]);
    }
}
