@extends('layout.main')

@section('css')
    <link href="{{ URL::asset('assets/plugins/autocomplete/jquery.autocompleter.css') }}" rel="stylesheet" />
@endsection

@section('content')

    <div class="main-container container-fluid px-0">
        <!-- CONTENT -->

        <div class="col-lg-8">
            <div class="row" style="padding-top: 20px;">
                <div class="col-md-6">
                    @include('layout/success-message', ['status' => 'success'])
                    <div class="cont-appointment-buttons">
                        <livewire:appointment.button-finish-appointment :appointment=$appointment />
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Customer information</h3>
                        </div>
                        <div class="view_map_point" id="customer_map">

                        </div>
                        <div class="card-body">
                            
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <a href="{{ route('customer.show', ['customer' => $appointment->customer]) }}" class="appointment-cutomer-name">{{ $appointment->customer->name }}</a>
                                    <a href="{{ route('customer.edit', ['customer' => $appointment->customer]) }}?redirect={{ route('appointment.show',$appointment) }}">
                                        <i class="fe fe-edit text-success pull-right"></i>
                                    </a>
                                </li>
                                <li class="list-group-item">{{ $appointment->address->full }}</li>
                                <li class="list-group-item">{{ $appointment->customer->phone }}</li>
                                <li class="list-group-item">{{ $appointment->customer->email }} 
                                    <a href="{{ route('invoice.create', ['appointment' => $appointment]) }}"><i
                                       class="fe fe-send pull-right text-secondary" style="cursor: pointer"></i></a>
                                </li>
                            </ul>
                        </div>
                        @include('customer.layout.referral-block',['customer' => $appointment->customer, 'referral_count' => $referral_count, 'referral_discount' => $referral_discount])
                    </div>
                </div>
                <div class="col-md-6">
                    
                    <livewire:appointment.services :appointment=$appointment isViewTaxable='true'/>
                    
                    <livewire:appointment.tech-block :appointment=$appointment />

                    <livewire:appointment.notes :appointment=$appointment />
                    
                    <div class="remove-appointment-block">
                        <form method="post" onsubmit="return confirm('Are you sure?')" action="{{ route('appointment.remove',['appointment'=>$appointment]) }}">
                            @csrf
                            @method('delete')
                            <button type="submit" class="btn btn-link" style="text-decoration: none">remove appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{--Ppayemnt model--}}
    

@stop

@section('scripts')

    <script async src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP') }}&callback=initMap"></script>
    
    <script>
        let noPoi = [{
            featureType: "poi",
            stylers: [{
                visibility: "off"
            }]
        }];
        let map;
        let geocoder;
        let address = "{{ $appointment->address->full }}";

        function initMap() {
            geocoder = new google.maps.Geocoder();
            let point = {
                lat: -34.397,
                lng: 150.644
            };
            map = new google.maps.Map(document.getElementById("customer_map"), {
                center: point,
                zoom: 13,
                disableDefaultUI: true,
            });
            codeAddress(address);
            map.setOptions({
                styles: noPoi
            });
        }

        function codeAddress(address) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                var latLng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                };
                if (status == 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        window.initMap = initMap;
    </script>

    <script>
        
        function setAmount(b){
            var type = $(b).attr('data-type');
            var remainingBalance = $('#remainingBalance').val();
            if(type == 0){
                var newAmount = $(b).attr('data-amount');
            } else if(type == 1){
                var procent = $(b).attr('data-amount');
                var newAmount = (remainingBalance * procent) / 100;
            }
            
            $('#amountPayment').val(newAmount);
            return false;
        }

        function setPaymentType(b){
            $(b).parent().find('button').removeClass('active');
            $(b).addClass('active');
            $(b).parent().parent().find('input').val($(b).attr('data-type'));
        }
        
    </script>
    
    <script>
        window.addEventListener('close-modal', event => {
            $('#add_new_tech_model').modal('hide');
        })
    </script>
    
    @include('service.typehead-script',['componentName' => 'appointment.services'])
    
@endsection
