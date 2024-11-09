<div class="row">
   <div class="col-6">
      @if (Auth::user()->company->logo)
            <img src="{{ env('AWS_FILE_ACCESS_URL').Auth::user()->company->logo }}" style="width: 170px;" class="header-brand-img logo-3" alt="Sash logo">    
      @endif
      <p style="margin-top: 20px"><b>{{ Auth::user()->company->name }}</b></p>
      <div>
            <address>
               {{ Auth::user()->company->address->full }}<br>
            </address>
            <span class="company_phone">{{ Auth::user()->company->phone }}</span><br>
            <span class="email">{{ Auth::user()->company->email }}</span>
      </div>
   </div>
   <div class="col-6 text-end border-bottom border-0">
      <h3 class="text-end">#INV-{{ $invoice->id }}</h3>
      <h5 class="text-end">Date Issued: {{ \Carbon\Carbon::parse($invoice->created_at)->format('m-d-Y') }}</h5>
   </div>
</div>
<div class="row pt-5">
   <div class="col-6">
      <p class="h3">Invoice To:</p>
      <p class="fs-18 fw-semibold mb-0"><span id="invoice-customer-name">{{ $invoice->customer_name }}</span></p>
      <address>
         <span id="invoice-address">{!!  $invoice->address  !!}</span><br>
         <span id="invoice-email">{{ $invoice->email }}</span>
      </address>
   </div>
   <div class="col-6 text-end">
      <p class="h4 fw-semibold text-end">Payment Details:</p>
      <p class="mb-1 text-end">Total Due: $<span id='total-small-invoice'>{{ $due }}</span></p>
   </div>
</div> 