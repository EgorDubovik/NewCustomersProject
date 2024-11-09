<style>
    .row {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -0.75rem;
        margin-left: -0.75rem;
        width: 100%;
    }

    .col-6 {
        width: 50%;
        float: left;
    }

    h3,
    .h3 {
        font-size: 1.5rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        margin-bottom: 0.66em;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.1;
        color: inherit;
    }

    .text-end {
        text-align: right !important;
    }

    .pt-3,
    .py-3 {
        padding-top: 0.75rem !important;
    }

    address {
        margin-bottom: 1rem;
        font-style: normal;
        line-height: inherit;
    }

    .card-body {

        width: 730px;
    }

    .mb-0,
    .my-0 {
        margin-bottom: 0 !important;
    }

    .fw-semibold {
        font-weight: 500 !important;
    }

    .fs-18 {
        font-size: 18px !important;
    }

    .invoice-customer-name {
        font-weight: bold;
    }

    .table {
        width: 100%;
    }

    .text-nowrap {
        white-space: nowrap !important;
    }

    .table th,
    .text-wrap table th {
        color: #2e3138;
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 400;
    }

    .table-hover tbody tr:hover,
    .table-hover tbody th {
        background-color: #f6f6fb;
    }

    table {
        border-collapse: collapse;
        margin-top: 20px;
    }

    th,
    td {
        padding: 5px;
        border: 1px solid rgb(206, 206, 206);
        border-collapse: collapse;
    }

    p {
        margin: 0px;
        padding: 0px;
    }

    .pt-5 {
        padding-top: 20px;
    }
</style>

<div class="card-body">
    <div class="row">
        <div class="col-6">
            @if ($invoice->company->logo)
                <img src="{{ $invoice->company->logo }}" style="width: 170px;"
                    class="header-brand-img logo-3" alt="Sash logo">
            @endif
            <p style="margin-top: 20px"><b>{{ $invoice->company->name }}</b></p>
            <div>
                <address>
                    {{ $invoice->company->fullAddress }}<br>
                </address>
                {{ $invoice->company->phone }}<br>
                {{ $invoice->company->email }}
            </div>
        </div>
        <div class="col-6 text-end border-bottom border-lg-0">
            <h3>#INV-{{ $invoice->id }}</h3>
            <h5>Date Issued: {{ \Carbon\Carbon::parse($invoice->created_at)->format('m-d-Y') }}</h5>
        </div>
    </div>
    <div style="clear: both;margin-bottom:50px"></div>
    
    <div class="row pt-5">
        <div class="col-6">
            <p class="h3">Invoice To:</p>
            <p class="fs-18 fw-semibold mb-0"><span
                    id="invoice-customer-name"><b>{{ $invoice->job->customer->name }}</b></span></p>
            <address>
                <span id="invoice-address">{!! $invoice->job->address->full !!}</span><br>
            </address>
            <p class="mb-0"><span id="invoice-phone">{{ $invoice->job->customer->phone }}</span></p>
            <p class="mb-0"><span id="invoice-email">{{ $invoice->email }}</span></p>
        </div>
        <div class="col-6 text-end">
            
            
            <p class="mb-1">Balance Due: $<span
                    id='total-small-invoice'>{{ $invoice->job->remaining_balance }}</span></p>
            
        </div>
    </div>
    <div style="clear: both"></div>
    <div class="table-responsive push row">

        <table class="table table-bordered table-hover mb-0 text-nowrap">
            <tbody>
                <tr id="tr-header-invoice-table">
                    <th class="text-center"></th>
                    <th>Item</th>
                    <th class="text-end">Total</th>
                </tr>
                @foreach ($invoice->job->services as $key => $service)
                    <tr>
                        <td class="text-center">{{ $key + 1 }}</td>
                        <td>
                            <p class="font-w600 mb-1">{{ $service->title }}</p>
                            <div class="text-muted">
                                <div class="text-muted">{!! nl2br($service->description) !!}</div>
                            </div>
                        </td>
                        <td class="text-end">${{ $service->price }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="2" class="text-uppercase text-end">Tax ({{ App\Models\CompanySettings\GeneralInfoSettings::getSettingByKey(Auth::user()->company_id,'taxRate')}}%)</td>
                    <td class="text-end h4"><span id="total-invoice"
                            style="font-size: 16px">${{ number_format($invoice->job->total_tax,2) }}</span></td>
                </tr>
                <tr>
                    <td colspan="2" class="fw-bold text-uppercase text-end">Total</td>
                    <td class="fw-bold text-end h4"><span id="total-invoice">${{ number_format($invoice->job->total_amount,2) }}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <p style="text-align: center;margin-top:50px;">Payments history:</p>
    <table style="width: 50%;border-spacing: 0px;border-collapse: collapse; border-style: outset;" align="right"
        border=0>
        @foreach ($invoice->job->payments as $payment)
            <tr>
                <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('M d Y') }}</td>
                <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('g:i A') }}</td>
                <td>{{ $payment->type_text }}</td>
                <td>${{ number_format($payment->amount, 2) }}</td>
            </tr>
        @endforeach
    </table>
</div>
