<div class="modal fade" id="payment_model" aria-hidden="true">
   <div class="modal-dialog" role="document">
       <div class="modal-content modal-content-demo">
           <div class="modal-header">
               <h6 class="modal-title">Payment
                   <span style="color: #5f5f5f; margin-left:20px;">(Total: $<span id="paymentTotal">{{ $total }}</span>)</span>
               </h6>
               <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>
           </div>
           <form method="post" action="{{ route('appointment.pay', ['appointment' => $appointment]) }}">
               @csrf
               <div class="row p-2">
                   <div class="col-10">Remainig payment:</div> 
                   <div class="col-2"> <b>$<span id="remainingBalanceSpan">{{ $remainingBalance }}</span></b></div>
                   <input type='hidden' id="remainingBalance" value="{{ $remainingBalance }}" />
               </div>
               <div class="modal-body">
                   <div class="amount-pay">
                       <span>$</span><input id="amountPayment" type="text" name="amount" value="{{ $remainingBalance }}">
                   </div>
                   <div class="btn-cont-payment">
                       @if ($remainingBalance > Auth::user()->settings->payment_deposit_amount)
                       <button 
                           type="button" 
                           onClick="setAmount(this)" 
                           data-amount="{{ Auth::user()->settings->payment_deposit_type==0 ? Auth::user()->settings->payment_deposit_amount : Auth::user()->settings->payment_deposit_amount_prc }}"
                           data-type="{{ Auth::user()->settings->payment_deposit_type  }}" 
                           class="btn btn-outline-primary" 
                           style="margin-right: 30px;">Deposit ( {!! Auth::user()->settings->payment_deposit_type==0 ? '$'.Auth::user()->settings->payment_deposit_amount : Auth::user()->settings->payment_deposit_amount_prc.'%' !!})
                       </button>
                       @endif
                       <button type="button" onClick="setAmount(this)" data-type=0 data-amount="{{ $remainingBalance }}" class="btn btn-outline-primary" id="buttonFull">Full</button>
                   </div>
                   <div class="type-of-payment">
                       Type of payment:
                       <div class="btn_cont_type">
                           <input type="hidden" name="payment_type" value="{{ \App\Models\Payment::CREDIT }}">
                           <div class="btn-group d-flex">
                               <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CREDIT }}" class="btn btn-outline-primary w-100 active">Credit</button>
                               <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::TRANSFER }}" class="btn btn-outline-primary w-100">Transfer</button>
                               <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CASH }}" class="btn btn-outline-primary w-100">Cash</button>
                               <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CHECK }}" class="btn btn-outline-primary w-100">Check</button>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="modal-footer">
                   <button class="btn btn-success" type="submit">Pay</button> <button class="btn btn-light" data-bs-dismiss="modal" onclick="return false;">Close</button>
               </div>
           </form>
       </div>
   </div>
</div>