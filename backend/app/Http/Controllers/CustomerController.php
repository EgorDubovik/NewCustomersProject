<?php

namespace App\Http\Controllers;

use App\Models\Addresses;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\ReferalLinksCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('customer.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('customer.create');
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
            'line1' => 'required',
            'customer_phone' => 'required',
        ],[
            'customer_phone.required' => 'Please fill your phone number',
            'line1.required' => 'Please fill at least first line of address',
        ]);

        $customer_name = $request->customer_name ?? "Unknow";

        DB::beginTransaction();

        try{
            $customer = Customer::create([
                'name' => $customer_name,
                'phone' => $request->customer_phone,
                'email' => $request->email,
                'company_id' => Auth::user()->company_id,
                'address_id' => 0,
            ]);

            $address = Addresses::create([
                'line1' => $request->line1,
                'line2' => $request->line2,
                'city' => $request->city,
                'state' => $request->state,
                'zip' => $request->zip,
                'customer_id' => $customer->id,
            ]);

            $referalCode = ReferalLinksCode::create([
                'company_id' => Auth::user()->company_id,
                'customer_id' => $customer->id,
                'code' => Str::random(10),
            ]);
            // $referalCode = ReferalLinksCode::create([
            //     'company_id' => null,
                
            // ]);

            DB::commit();
        }catch(\Exception $e){
            DB::rollBack();
            return back()->withErrors('Something went wrong');
        }

        return redirect()->route('customer.show',['customer'=>$customer])->with('success','Added successful');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {

        //!! Timezone from settings

        $this->authorize('view-customer',['customer'=>$customer]);
        $appointments = Appointment::where('customer_id', $customer->id)->get();
        $upcoming_appoinments = Appointment::where('customer_id', $customer->id)
                                            ->where('end','>', date('Y-m-d H:i:s'))
                                            ->get();
        
        $referral_info = get_referral_info($customer);

        return view('customer.show', ['customer'=>$customer, 
                                    'appointments' => $appointments,
                                    'upcoming_appoinments' => $upcoming_appoinments,
                                    'referral_count' => $referral_info['referral_count'],
                                    'referral_discount' => $referral_info['referral_discount'],
                                ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Customer $customer)
    {
        Gate::authorize('update-customer', $customer);
        
        return view('customer.edit', ['customer' => $customer]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        Gate::authorize('update-customer', $customer);

        if($request->address_id){
            $address = $customer->address->find($request->address_id);

            $address->update([
                'line1' => $request->line1,
                'line2' => $request->line2,
                'city' => $request->city,
                'state' => $request->state,
                'zip' => $request->zip,
            ]);
        }

        $customer->update([
            'name' => $request->customer_name,
            'phone' => $request->customer_phone,
            'email' => $request->email,
        ]);

        if($request->has('redirect')){
            return redirect($request->redirect);
        }
        
        return redirect()->route('customer.show', ['customer' => $customer])->with('success','Update customer have been successful');
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function add_address(Request $request, Customer $customer){
        Gate::authorize('update-customer', $customer);

        $address = Addresses::create([
            'line1' => $request->line1,
            'line2' => $request->line2,
            'city' => $request->city,
            'state' => $request->state,
            'zip' => $request->zip,
            'customer_id' => $customer->id,
        ]);

        return back()->with('success','Address has been added successfull');
    }

    public function remove_address(Addresses $address) {
        Gate::authorize('update-customer', $address->customer);
        $address->delete();
        return back()->with('success','Address has been removed successfull');

    }

    
}
