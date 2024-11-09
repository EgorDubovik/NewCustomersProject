@if (Auth::user()->company->companySettings && Auth::user()->company->companySettings->referral_enable)
      <div class="card-footer">
         <p>Referral stat: <span class="text-success">{{ count($customer->referralStat) }}/{{ $referral_count }} -> ${{ $referral_discount }}</span></p>
         <p>
            Referral code: <span class="text-success">{{ $customer->referralCode->code ?? "null" }}</span>
         </p>
      </div>
@endif