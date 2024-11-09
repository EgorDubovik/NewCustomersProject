<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Addresses;
use App\Models\AppointmentService;
use App\Models\AppointmentTechs;
use App\Models\Payment;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appoinments = Appointment::where('company_id', Auth::user()->company_id)->get();
        return view('schedule.index', ['appointments' => $appoinments]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        if ($request->has("customer")){
            $customer = Customer::where(['id' => $request->customer, 'company_id' => Auth::user()->company_id])->first();
            if (!$customer)
                return back();

            return view('schedule.create',['customer'=>$customer]);    
        }

        return back();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'customer_id'        => 'required|integer',
            'address_id' => 'required|integer',
            'time_from' => 'required',
            'time_to' => 'required',
            'tech_ids' => 'required',
        ]);

        Gate::authorize('make-appointment',[$request->customer_id, $request->address_id]);
        
        
        $appointment = Appointment::create([
            'customer_id' => $request->customer_id,
            'company_id' => Auth::user()->company_id,
            'address_id' => $request->address_id,
            'start' => $request->time_from,
            'end' => $request->time_to,
        ]);

        if($request->has('tech_ids')){
            foreach($request->tech_ids as $tech){
                AppointmentTechs::create([
                    'appointment_id' => $appointment->id,
                    'tech_id'        => $tech,
                    'creator_id'     => Auth::user()->id,
                ]);
            }
        } else 
            return redirect()->back()->withErrors(['msg' => 'Please choose at least one tech']);
        
        if($request->has('service-prices')){
            foreach($request->input('service-prices') as $key => $value){
                AppointmentService::create([
                    'appointment_id' => $appointment->id,
                    'title' => $request->input('service-title')[$key] ?: 'unknown',
                    'description' => $request->input('service-description')[$key],
                    'price' => $request->input('service-prices')[$key] ?: 0,
                    'taxable' => $request->input('service-isTaxable')[$key] ?: 0,
                ]);
            }
        }

        return redirect()->route('appointment.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Appointment  $Appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        
        $remainingBalance = $appointment->services->sum('price') - Payment::where('appointment_id',$appointment->id)->get()->sum('amount');


        $referralInfo = get_referral_info($appointment->customer);
        return view('schedule.show',[
            'appointment'       => $appointment,
            'remainingBalance'   => $remainingBalance,
            'referral_count'    => $referralInfo['referral_count'],
            'referral_discount' => $referralInfo['referral_discount'],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Appointment  $Appointment
     * @return \Illuminate\Http\Response
     */
    public function edit(Appointment $appointment)
    {   
        Gate::authorize('update-remove-appointment',['appointment'=>$appointment]);
        return  view('schedule.edit', ['appointment' => $appointment]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $Appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        Gate::authorize('update-remove-appointment',['appointment'=>$appointment]);
        
        $validate = $request->validate([
            'address_id'        => 'required|integer',
            'time_from' => 'required',
            'time_to' => 'required',
        ]);

        $address = Addresses::find($request->address_id);
        if(!$address || $address->customer_id != $appointment->customer->id )
            abort(404);

        $appointment->update([
            'start' => $request->time_from,
            'end' => $request->time_to,
            'address_id' => $request->address_id,
        ]);
        return redirect()->route('appointment.show',['appointment'=>$appointment]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Appointment  $Appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        Gate::authorize('update-remove-appointment',['appointment'=>$appointment]);
        $appointment->appointmentTechs()->delete();
        $appointment->notes()->delete();
        $appointment->payments()->delete();
        $appointment->services()->delete();
        $appointment->delete();
        return redirect()->route('appointment.index');
    }

    public function viewall(Customer $customer)
    {   
        $appointments = Appointment::where('customer_id',$customer->id)->orderBy('end','desc')->get();
        return view('schedule.viewall',['customer'=>$customer,'appointments'=>$appointments]);
    }

    public function map(){
        $appoinments = Appointment::where('company_id',Auth::user()->company_id)
            ->with('address')
            ->with('customer')
            ->groupBy('address_id')
            ->orderBy('end','desc')
            ->get()
            ->makeHidden(['start','end','company_id','status','created_at','updated_at']);

        foreach($appoinments as $appoinment){
            $appoinment->address->makeHidden(['id','line1','line2','city','state','zip','customer_id','created_at','updated_at']);
            $appoinment->customer->makeHidden(['phone','email','address_id','company_id','created_at','updated_at']);
        }

        return view('schedule.map',['appointments' => $appoinments]);
    }

    public function update_time(Request $request){
        $appointment = Appointment::find($request->appointment_id);
        Gate::authorize('update-remove-appointment',['appointment'=>$appointment]);

        $appointment->update([
            'start' => $request->startTime,
            'end'   => $request->endTime,
        ]);

        return response()->json(['success' => 'success'], 200);

    }
}
