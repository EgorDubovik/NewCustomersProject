@extends('layout.main')

@section('content')

    <div class="main-container container-fluid px-0">
        <!-- CONTENT -->

        <div class="col-lg-8">
        <div class="row" style="padding-top: 20px;">
            <div class="col-md-6">
                @include('layout/success-message',['status' => 'success'])
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Customer information</h3>
                    </div>
                    <div class="view_map_point" id="customer_map">

                    </div>
                    <div class="card-body">
                        <p>
                            <span style="font-size:20px;">{{$customer->name}}</span>
                            <a href="{{route('customer.edit',['customer' => $customer])}}">
                                <i class="fe fe-edit text-success pull-right"></i>
                            </a>
                        </p>
                        <p>
                            <span class="fs-14 fw-bold">{{$customer->address->last()->full}}</span>
                            <i class="fe fe-copy pull-right text-secondary" style="cursor: pointer"></i>
                            <a href="#"> <i class="fe fe-map-pin pull-right" style="margin-right: 10px;"></i></a>
                            
                        </p>
                        
                        <p>
                            <span class="fs-14 text-info fw-bold">{{$customer->phone}}</span>
                            <i class="fe fe-copy pull-right text-secondary" onclick="copy_to({{$customer->phone}})" style="cursor: pointer"></i>
                            <a href="#"> <i class="fe fe-phone-call pull-right" style="margin-right: 10px;"></i></a>
                        </p>
                        <p>
                            <span class="fs-14 text-black">{{$customer->email}}</span>
                        </p>
                    </div>
                    @include('customer.layout.referral-block',['customer' => $customer, 'referral_count' => $referral_count, 'referral_discount' => $referral_discount])
                    
                </div>
            </div>
            <div class="col-md-6">
                {{-- Scheduling                --}}
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Scheduling</h3>
                        <div class="card-options">
                            <a href="{{route('schedule.create',['customer' => $customer->id])}}">
                                <i class="fe fe-plus-circle text-success"></i>
                            </a>
                        </div>
                    </div>
                    <div class="card-body">
                        @if (count($upcoming_appoinments)>0)
                            <p class="text-muted">Upcoming appointment</p>
                            <div class="card upcuming-card">
                                <div class="card-body">
                                    <div class="time-upcoming"><b>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $upcoming_appoinments->first()->start)->format('H:i') }} - {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $upcoming_appoinments->first()->end)->format('H:i') }}</b> </div>
                                    <div class="name-upcoming">Washer</div>
                                    <a href="{{ route('appointment.show', ['appointment' => $upcoming_appoinments->first()]) }}" class="stretched-link"></a>
                                </div>
                            </div>    
                        @else
                            <p class="text-muted">No upcoming appointment</p>
                        @endif

                        @if (count($appointments)>0)
                            <p class="text-muted">Last appointment</p>
                            
                            @include('schedule.inludes.past-appointments',['appointment' => $appointments->last()])
                        @else
                            <p class="text-muted">No past appointment</p>
                        @endif
                        
                        <p class="text-end"><a href="{{ route('appointment.viewall',['customer'=>$customer]) }}">View all History ({{ count($appointments) }})</a></p>
                    </div>
                </div>


                {{-- Images                --}}
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Images</h3>
                    </div>
                    @include('layout/error-message')
                    <div class="card-body">
                        <form method="post" action="{{route('image.store',['customer' => $customer])}}" enctype="multipart/form-data">
                            @csrf
                            <div class="input-group mb-3">
                                <input class="form-control form-control-sm" name="images[]" type="file" multiple>
                                <div class="input-group-append">
                                    <button class="btn btn-primary btn-sm" type="submit">Upload</button>
                                </div>
                            </div>
                        </form>
                        <div class="row">
                            @foreach($customer->images as $image)
                                <div class="col-4 col-sm-2 customer-img-bl">
                                    <a href="{{route('image.delete',['image'=>$image])}}" onclick="return confirm('Are you sure?');"><span class="close">&times;</span></a>
                                    <img src="{{ env('AWS_FILE_ACCESS_URL').$image->path }}" />
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Customer Tags</h3>
                        <div class="card-options">
                            <a class="fs-16 text-orange" style="margin-left: 20px;" data-bs-toggle="modal" href="#add_new_tag_model"><i class="fe fe-plus-circle"></i> </a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="tags-row mb-3">
                            @foreach($customer->tags as $tag)
                                <span class="tag tag-rounded tag-icon tag-orange">{{$tag->title}} <a href="{{route('tag.untie',[$customer,$tag])}}" class="tag-addon tag-addon-cross tag-orange"><i class="fe fe-x text-white m-1"></i></a></span>
                            @endforeach
                        </div>
                    </div>
                </div>
                @include('customer.notes')
            </div>
        </div>
        </div>
    </div>

    {{--Add new tag model--}}
    <div class="modal fade" id="add_new_tag_model" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h6 class="modal-title">Add new tag</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>
                </div>
                <form method="post" action="{{route('tag.assign',['customer' => $customer])}}">
                    @csrf
                    <div class="modal-body">
                        <input type="hidden" id="tag-id" name="tag_id" value="0">
                        <ul class="list-group list-group-flush">
                            @foreach(\Illuminate\Support\Facades\Auth::user()->company_tags as $tag)
                                <li class="list-group-item tag-li" onClick="selectTag(this)" data-id="{{ $tag->id }}">{{ $tag->title }}</li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" type="submit">Add</button> <button class="btn btn-light" data-bs-dismiss="modal" onclick="return false;">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
@stop

@section('scripts')

    <script async src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP') }}&callback=initMap"></script>
    <script>
        let noPoi = [
            {
                featureType: "poi",
                stylers: [
                    { visibility: "off" }
                ]   
            }
        ];
        let map;
        let geocoder;
        let address = "{{ $customer->address->last()->full }}";
        function initMap() {
            geocoder = new google.maps.Geocoder();
            let point = { lat: -34.397, lng: 150.644 };
            map = new google.maps.Map(document.getElementById("customer_map"), {
                center: point,
                zoom: 13,
                disableDefaultUI: true,
            });
            codeAddress(address);
            map.setOptions({styles: noPoi});
        }
        function codeAddress(address) {
            geocoder.geocode({ 'address': address }, function (results, status) {
                var latLng = {lat: results[0].geometry.location.lat (), lng: results[0].geometry.location.lng ()};
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
        function copy_to(text){
            navigator.clipboard.writeText(text);
        }

        function confirmRemove(){
            if (confirm('Are you sure?'))
                return true;
            return false;
        }

        function selectTag(d){
            $(".tag-li").removeClass('active');
            $(d).addClass('active');
            $("#tag-id").val($(d).attr('data-id'));
        }
    </script>
@endsection
