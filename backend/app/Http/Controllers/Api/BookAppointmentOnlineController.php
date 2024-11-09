<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BookAppointment;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;
use App\Models\Addresses;
use App\Models\Appointment;
use App\Models\BookAppointmentProvider;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Mail\BookOnline;
use App\Mail\BookOnlineForCompany;
use Illuminate\Support\Facades\Mail;
use App\Mail\DeleteAppointment;
use App\Models\Job\Job;
use App\Models\Service;
use App\Models\Job\Service as JobService;
use App\Models\AppointmentTechs;

class BookAppointmentOnlineController extends Controller
{
    public function index($key){
        $companyBook = BookAppointment::where('key',$key)
                                    ->first();
        if(!$companyBook)
            return response()->json(['error' => 'Company not found'],404);
        
        $company = $companyBook->company;
        if(!$companyBook->active)
            return response()->json(['error' => 'not_active','phone'=>$company->phone],200);
        if(!$company)
            return response()->json(['error' => 'Company not found'],404);

        $returnCompanyJSON = [
            'key' => $key,
            'logo' => $company->logo,
            'phone' => $company->phone,
            'name' => $company->name,
            'services' => $company->bookAppointment->services,
            'workingTime' => $companyBook->working_time ?? '[]',
        ];
        
        return response()->json(['company' => $returnCompanyJSON,'key' => $key],200);
    }

    public function store(Request $request,$key){
        $companyBook = BookAppointment::where('key',$key)
                                    ->where('active',1)
                                    ->first();
        if(!$companyBook)
            return response()->json(['error' => 'Company not found'],404);
        
        $company = $companyBook->company;
        if(!$company)
            return response()->json(['error' => 'Company not found'],404);


        DB::beginTransaction();
        try{
            $request->validate([
                'customer.phone' => 'required',
                'customer.address1' => 'required',
            ],[
                'customer.phone.required' => 'Please fill your phone number',
                'customer.address.required' => 'Please fill at least first line of address',
            ]);

            
            $phone = strlen($request->customer['phone']) > 10 ? substr($request->customer['phone'],-10) : $request->customer['phone'];
            $customer = Customer::create([
                'name' => $request->customer['name'] ?? 'Unknown',
                'phone' => $phone,
                'email' => $request->customer['email'] ?? null,
                'company_id' => $company->id,
            ]);

            $address = Addresses::create([
                'line1' => $request->customer['address1'],
                'line2' => $request->customer['address2'] ?? null,
                'city' => $request->customer['city'] ?? null,
                'state' => $request->customer['state'] ?? null,
                'zip' => $request->customer['zip'] ?? null,
                'customer_id' => $customer->id,
            ]);
    
            $startTime = Carbon::createFromFormat('Y-m-d H:i:s',  $request->selectedDateTime);
            $endTime = $startTime->copy()->addHours(2);
            $job = Job::create([
                'company_id' => $company->id,
                'customer_id' => $customer->id,
                'address_id' => $address->id,
            ]);
            $appointment = Appointment::create([
                'job_id' => $job->id,
                'company_id' => $company->id,
                'start' => $startTime,
                'end' => $endTime,
            ]);

            if($request->has('services')){
                foreach($request->input('services') as $key => $value){
                    $company_service = Service::where('company_id',$company->id)
                                            ->where('id',$value)->first();
                    if($company_service){                        
                        JobService::create([
                            'job_id' => $job->id,
                            'title' => $company_service->title,
                            'description' => $company_service->description,
                            'price' => $company_service->price,
                            'taxable' => 1,
                        ]);
                    }
                }
            }

            $atachedTech = false;
            foreach($company->techs as $tech){
                if($tech->roles->pluck('role')->contains(2)){
                    $appointment->techs()->attach($tech->id);
                    $atachedTech = true;
                    break;
                }
            }
            if(!$atachedTech){
                $appointment->techs()->attach($company->techs->first()->id);
            }

            $key = Str::random(40);
            while(BookAppointmentProvider::where('key', $key)->exists()) {
                $key = Str::random(40);
            }
            
            $bookAppointmentProvider = BookAppointmentProvider::create([
                'appointment_id'    => $appointment->id,
                'key'               => $key,
            ]);

            // Send email to customer
            if($request->customer['email'])
                Mail::to($request->customer['email'])->send(new BookOnline($appointment,$bookAppointmentProvider->key));
            
            // Send email to company
            if($appointment->company->email)
                Mail::to($appointment->company->email)->send(new BookOnlineForCompany($appointment));

            DB::commit();
            return response()->json(['providerKey'=>$key],200);
        }
        catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()],500);
        }
        
    }
    
    public function view(Request $request,$providerkey){

        $bookAppointmentProvider = BookAppointmentProvider::where('key',$providerkey)->first();
        if(!$bookAppointmentProvider)
            return response()->json(['error' => 'Appointment not found'],404);

        $appointment = $bookAppointmentProvider->appointment;
        if(!$appointment)
            return response()->json(['error' => 'Appointment not found'],404);

        $services = [];
        foreach($appointment->job->services as $key => $servcie){
            $services[] = [
                'title' => $servcie->title,
                'price' => $servcie->price,
            ];
        }

        $return = [
            'providerKey' => $providerkey,
            'company' => [
                'name' => $appointment->company->name,
                'logo' => $appointment->company->logo,
                'phone' => $appointment->company->phone,
            ],
            'customer' => [
                'name' => $appointment->job->customer->name,
                'phone' => $appointment->job->customer->phone,
                'address' => $appointment->job->address->full,
            ],
            'appointment' => [
                'time1' => Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('M d').' at '.Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A'),
                'time2' => Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('l, F d, Y'),
                'time3' => Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A').' - '.Carbon::createFromFormat('Y-m-d H:i:s',$appointment->end)->format('g:i A'),
            ],
            'services' => $services,
        ];

        return response()->json($return,200);
    }

    public function remove(Request $request,$providerkey){
        $bookAppointmentProvider = BookAppointmentProvider::where('key',$providerkey)->first();
        if(!$bookAppointmentProvider)
            return response()->json(['error' => 'Appointment not found'],404);

        $appointment = $bookAppointmentProvider->appointment;
        if(!$appointment)
            return response()->json(['error' => 'Appointment not found'],404);

        $bookAppointment = BookAppointment::where('company_id',$bookAppointmentProvider->appointment->company_id)->first();
        $key = ($bookAppointment) ? $bookAppointment->key : null;
        
        $errorsSendEmail = [];
        foreach($appointment->techs as $tech){
            try{
                Mail::to($tech->email)->send(new DeleteAppointment($appointment));
            } catch(\Exception $e){
                $errorsSendEmail[] = $e->getMessage();
            }
            
        }
        
        try{
            $appointment->job->services()->delete();
            AppointmentTechs::where('appointment_id',$appointment->id)->delete();
            $appointment->job->address()->delete();
            $appointment->job->customer()->delete();
            $appointment->job()->delete();
            $appointment->delete();
            $bookAppointmentProvider->delete();
        } catch(\Exception $e){
            $errorsSendEmail[] = $e->getMessage();
        }
        
        
        return response()->json(['success' => 'Appointment removed','key'=>$key, 'errors'=>$errorsSendEmail],200);
    }
}
