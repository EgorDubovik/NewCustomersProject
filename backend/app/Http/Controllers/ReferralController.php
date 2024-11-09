<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanySettings;
use Illuminate\Http\Request;
use App\Models\ReferalCustomerStat;
use App\Models\ReferalLinksCode;
use App\Models\Customer;
use App\Models\ReferralRange;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ReferralController extends Controller
{
    public function index(Request $request, $code){

        $referalCode = ReferalLinksCode::where('code',$code)->first();
        if(!$referalCode)
            return abort(404);

        $customer = Customer::find($referalCode->customer_id);
        if(!$customer)
            return abort(404);

        $newReferral = ReferalCustomerStat::firstOrCreate([
            'company_id' => $referalCode->company_id,
            'customer_id' => $referalCode->customer_id,
            'ip' => $request->ip(),
        ]);

        $companySettings = CompanySettings::where('company_id',$referalCode->company_id)->first();
        if($companySettings && 
            $companySettings->referral_link && 
            $companySettings->referral_link != '' &&
            $companySettings->referral_enable)

            $redirectLink = $companySettings->referral_link.'?ref='.$code;
        else
            $redirectLink = 'companyPage';

        return redirect($redirectLink);
    }

    public function stat(Request $request,$code){
        $referalCode = ReferalLinksCode::where('code',$code)->first();
        if(!$referalCode)
            return abort(404);
        $company = Company::find($referalCode->company_id);
        if(!$company)
            return abort(404);
        
        $stats = ReferalCustomerStat::where('company_id',$company->id)
                                        ->where('customer_id',$referalCode->customer_id)
                                        ->get();
        $referralRange = ReferralRange::where('company_id',$company->id)->get();
        
        $rangeCount = 0;
        $statCount = $stats->count();
        $upto = 0;
        foreach($referralRange as $range){
            if($range->referral_count <= $statCount)
                $range->procent = 100;
            else{
                $dif = $range->referral_count - $rangeCount;
                $statDif = $statCount - $rangeCount;
                if($statDif <= 0)
                    $range->procent = 0;
                else
                    $range->procent = round($statDif*100/$dif);
            }
            $rangeCount += $range->referral_count;    
            $upto = $range->discount;
        }

        return view('referral.stat',[
            'stats' => $stats,
            'company'=>$company,
            'referralRange' => $referralRange,
            'upto' => $upto,
            'code' => $code,
        ]);
    }

    
}
