<?php

namespace App\Http\Controllers;

use App\Models\BookAppointment;
use App\Models\BookOnlineCounterStatistics;
use App\Models\ReferralRange;
use Illuminate\Http\Request;
use App\Models\Settings;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use App\Models\CompanySettings;

class SettingsConstroller extends Controller
{
    public function show(Request $request){
        $settings = Settings::where('company_id',Auth::user()->company_id)->first();
        if(!$settings){
            $settings = Settings::create([
                'company_id' => Auth::user()->company_id,
            ]);
        }
        return view('settings',['settings'=>$settings]);
    }

    public function savePaymentDepositType(Request $request){
        
        $validate = $request->validate([
            'payment_deposit_type' => 'required|numeric',
        ]);

        if($request->payment_deposit_amount_prc > 100 || $request->payment_deposit_amount_prc < 0)
            return back()->withErrors(['error'=>'Procent must be less then 100% or more then 0 %']);
        
        if($request->payment_deposit_amount < 0)
            return back()->withErrors(['error'=>'Deposit amount must be more 0']);
        
        if($request->payment_deposit_type <0 || $request->payment_deposit_type > 1)
            return back()->withErrors(['error'=>'Wrong deposit type']);

        $settings = Settings::where('company_id',Auth::user()->company_id)->first();
        $settings->payment_deposit_type = $request->payment_deposit_type;
        $settings->payment_deposit_amount = $request->payment_deposit_amount;
        $settings->payment_deposit_amount_prc = $request->payment_deposit_amount_prc;
        $settings->save();

        return back()->with('success', 'Deposit inforation have been updated successfull');
    }

    public function bookOnline(Request $request){
        Gate::authorize('book-online');
        
        $bookAppointment = BookAppointment::where('company_id', Auth::user()->company_id)->first();
        if(!$bookAppointment)
            $bookAppointment = BookAppointment::create([
                'company_id' => Auth::user()->company_id,
                'key' => Str::random(30),
                'active' => 1,
            ]);
        $bookOnlineStats = BookOnlineCounterStatistics::where('book_online_id',$bookAppointment->id)
            ->orderBy('created_at','desc')
            ->limit(100)
            ->get();
        
        return view('settings.book-online',[
            'bookAppointment'=>$bookAppointment,
            'bookOnlineStats' => $bookOnlineStats,
        ]);
    }

   
    public function bookOnlineDelete(Request $request){
        Gate::authorize('book-online');

        $bookAppointment = BookAppointment::where('company_id', Auth::user()->company_id)->first();
        if(!$bookAppointment)
            return back();
        
        $bookAppointment->delete();

        return back();
    }

    public function bookOnlineActivate(Request $request){
        Gate::authorize('book-online');
        $status = $request->status == 'true' ? 1 : 0;

        $bookAppointment = BookAppointment::where('company_id', Auth::user()->company_id)->first();
        if(!$bookAppointment)
            return response()->json(['error' => 'Unauthenticated.'], 401);

        $bookAppointment->update([
            'active' => $status,
        ]);

        return response()->json(['saccess'=>'Updated saccessfull'],200);

    }

    public function referral(Request $request){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',$company);
        $company->companySettings = CompanySettings::firstOrCreate(['company_id'=>$company->id]);

        $referralRange = ReferralRange::where('company_id',$company->id)->get(); 
        return view('settings.referral',['company'=>$company,'referralRange'=>$referralRange]);
    }

    public function referralActivate(){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',$company);
        
        $company->companySettings->referral_enable = !$company->companySettings->referral_enable;
        $company->companySettings->save();

        
        return response()->json(['saccess'=>'Updated saccessfull'],200);
    }

    public function referralChangeRange(Request $request){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',$company);     

        $referralRange = ReferralRange::where('company_id',$company->id)->get();
        foreach($referralRange as $range){
            $range->delete();
        }

        foreach($request->referral_count as $key => $count){
            ReferralRange::create([
                'company_id' => $company->id,
                'referral_count' => $request->referral_count[$key],
                'discount' => $request->referral_discount[$key],
            ]);
        }

        return back()->with('success','Range have been updated successfull');
    }

    public function referralSaveLink(Request $request){
        $company = Auth::user()->company;
        Gate::authorize('edit-company',$company);
        $validate = $request->validate([
            'referral_link' => 'required|url',
        ]);

        $company->companySettings->referral_link = $request->referral_link;
        $company->companySettings->save();
        return back()->with('success','Referral link have been updated successfull');
    }
}
