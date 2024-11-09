@extends('layout.main')

@section('css')
    <link href="{{ URL::asset('assets/plugins/typehead/jquery.typeahead.css') }}" rel="stylesheet" />
@endsection

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Create new invoice</h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <form method="post" action="{{ route('invoice.store') }}">
            @csrf
            <input type="hidden" name="appointment_id" value="{{ $appointment->id }}">
            <div class="row">
                <div class="col-md-6">
                    <div class="card col-12">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    @if (Auth::user()->company->logo)
                                        <img src="{{ env('AWS_FILE_ACCESS_URL').Auth::user()->company->logo }}"
                                            style="width: 170px;" class="header-brand-img logo-3" alt="Sash logo">
                                    @endif
                                    <p style="margin-top: 20px"><b>{{ Auth::user()->company->name }}</b></p>
                                    <div>
                                        <address>
                                            @if (Auth::user()->company->address)
                                                {{ Auth::user()->company->address->full }}<br>
                                            @else
                                                <a href="{{ route('company.edit') }}">add company address</a>
                                            @endif

                                        </address>
                                        {!! Auth::user()->company->phone ? Auth::user()->company->phone : '' !!} <br>
                                        {!! Auth::user()->company->email ? Auth::user()->company->email : '' !!} <br>
                                    </div>
                                </div>
                                <div class="col-lg-6 text-end border-bottom border-lg-0">
                                    <h3>#INV-000</h3>
                                </div>
                            </div>
                            <div class="row pt-5">
                                <div class="col-lg-6">
                                    <p class="h3">Invoice To:</p>
                                    <p class="fs-18 fw-semibold mb-0">{{ $appointment->customer->name }}</p>
                                    <address>
                                        <span id="invoice-address">{{ $appointment->address->line1 }},
                                            {{ $appointment->address->line2 }}<br>
                                            {{ $appointment->address->city }} {{ $appointment->address->state }}
                                            {{ $appointment->address->zip }}</span><br>
                                        <span id="invoice-email">{{ $appointment->customer->email }}</span>
                                    </address>
                                </div>
                                <div class="col-lg-6 text-end">
                                    <p class="h4 fw-semibold">Payment Details:</p>
                                    <p class="mb-1">Total Due: $<span id='total-small-invoice'>{{ $due }}</span></p>
                                </div>
                            </div>
                            <div class="table-responsive push">
                                @include('invoice.layout.services-table', ['services' => $appointment->services])
                            </div>
                            <p style="text-align: center;margin-top:50px;">Payments history:</p>
                            @include('invoice.layout.payment-table', ['payments' => $appointment->payments])
                        </div>
                        <div class="card-footer">
                            <div class="input-group">
                                <button type="submit" class="btn btn-secondary mb-1"><i class="si si-paper-plane"></i>
                                    Send Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

@stop
