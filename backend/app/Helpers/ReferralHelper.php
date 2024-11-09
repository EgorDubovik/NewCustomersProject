<?php

use App\Models\ReferralRange;
use Illuminate\Support\Facades\Auth;

if (! function_exists('get_referral_info')) {
    function get_referral_info($customer)
    {
        $referal_count = 0;
        $referal_discount = 0;
        $referal_customer_stat = count($customer->referralStat);
        $referal_company_range = ReferralRange::where('company_id', Auth::user()->company_id)
                                                    ->where('referral_count','<=',$referal_customer_stat)
                                                    ->first();
        if($referal_company_range){
            $referal_count = $referal_company_range->referral_count;
            $referal_discount = $referal_company_range->discount;
        } else {
            $referal_company_range = ReferralRange::where('company_id', Auth::user()->company_id)
                                                    ->first();
            if($referal_company_range){
                $referal_count = $referal_company_range->referral_count;
                $referal_discount = $referal_company_range->discount;
            }
        }

        return [
            'referral_count' => $referal_count,
            'referral_discount' => $referal_discount
        ];
   }
}