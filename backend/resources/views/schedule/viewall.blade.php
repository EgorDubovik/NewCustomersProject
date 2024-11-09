@extends('layout.main')

@section('content')

    <div class="main-container container-fluid px-0">
        <!-- CONTENT -->

        <div class="col-lg-8">
            <div class="row" style="padding-top: 20px;">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Customer schedule history for <a href="{{ route('customer.show', ['customer'=>$customer]) }}" class='text-primary'>{{ $customer->name }}</a></h3>
                        </div>
                        <div class="card-body">
                            @foreach ($appointments as $appointment)                            
                                <div class="card upcuming-card">
                                    <div class="card-body">
                                        <div class="time-upcoming"><b>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->start)->format('H:i') }} - {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->end)->format('H:i') }} <span style="margin-left: 20px;font-size: 14px;color: #ccc;">{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->end)->format('m-d-Y') }}</span></b> </div>
                                        <div class="name-upcoming">Washer</div>
                                        <a href="{{ route('appointment.show', ['appointment' => $appointment]) }}" class="stretched-link"></a>
                                    </div>
                                </div>    
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
@stop

@section('scripts')

@endsection
