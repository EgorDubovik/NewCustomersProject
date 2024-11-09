@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Edit customer</h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="col-12">
                @include('layout/success-message',['status' => 'success'])
                <div class="card col-md-6 m-auto">
                    <form method="post" action="{{route('customer.update', ['customer' => $customer])}}">
                        @csrf
                        @if (request()->has('redirect'))
                            <input type="hidden" value="{{ request()->get('redirect') }}" name="redirect" />
                        @endif
                        
                        <div class="card-body">
                            <div class="category-create-address">Customer </div>
                            <div style="margin-left: 20px;">
                                <div class="row mb-4">
                                    <label class="col-md-2 control-label">Full Name</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control customer_name" placeholder="Customer Full Name" name="customer_name" value="{{$customer->name}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label class="col-md-2 control-label">Phone</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control customer_phone" placeholder="Phone number" name="customer_phone" value="{{$customer->phone}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label class="col-md-2 control-label">Email</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control customer_phone" placeholder="Email address" name="email" value="{{$customer->email}}">
                                    </div>
                                </div>
                            </div>

                            <div class="category-create-address">Address  <a href="#" class="parse_btn" onclick="$('.parse_address').show(); return false;">parse</a></div>

                            <textarea name="parse_address" style="display: none" class="parse_address form-control mb-2" onblur="parse_my_address(this)"></textarea>


                            <div class="address_input_form" style="display: none">
                                <input type="hidden" name="address_id" class="address_id">
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">Line 1</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="House number, street" class="form-control line1" name="line1" value="">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">Line 2</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="apt. number" class="form-control line2" name="line2" value="">
                                    </div>
                                </div>

                                <!-- Text input-->
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">City</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="City" class="form-control city" name="city" value="">
                                    </div>
                                </div>

                                <!-- Text input-->
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">State</label>
                                    <div class="col-sm-4">
                                        <input type="text" placeholder="State" class="form-control state" name="state" value="">
                                    </div>

                                    <label class="col-sm-2 control-label" for="textinput">Zip</label>
                                    <div class="col-sm-4">
                                        <input type="text" placeholder="Post Code" class="form-control zip" name="zip" value="">
                                    </div>
                                </div>
                            </div>

                            <div class="addresses">
                                <p class="text-end"><a data-bs-toggle="modal" href="#add_new_address_model">+ add new address</a></p>
                                    <ul class="list-group">  
                                        @foreach ($customer->address as $address)
                                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                                            onclick="edditAddress(this);"
                                            data-line1 = '{{ $address->line1 }}'
                                            data-line2 = '{{ $address->line2 }}'
                                            data-city = '{{ $address->city }}'
                                            data-state = '{{ $address->state }}'
                                            data-zip = '{{ $address->zip }}'
                                            data-id = '{{ $address->id }}'
                                        >
                                            <span style="cursor: pointer;width:100%">{{ $address->full }}</span>
                                            <a  href="{{ route('customer.remove.address',['address' => $address]) }}" onclick="if(!confirm('Are you sure you want to remove this address?')) return false;" class="text-danger"><i class="fa fa-trash"></i></a>
                                        </li>
                                        @endforeach
                                    </ul>
                                    {{-- <div class="list-group">
                                        <button onclick="edditAddress(this);return false;" class="list-group-item list-group-item-action"
                                            data-line1 = '{{ $address->line1 }}'
                                            data-line2 = '{{ $address->line2 }}'
                                            data-city = '{{ $address->city }}'
                                            data-state = '{{ $address->state }}'
                                            data-zip = '{{ $address->zip }}'
                                            data-id = '{{ $address->id }}'
                                        >{{ $address->full }}</button>
                                    </div> --}}
                            </div>

                            {{-- @if(count($customer->address) <= 1)
                            <div style="margin-left: 20px;">
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">Line 1</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="House number, street" class="form-control line1" name="line1" value="{{$customer->address->last()->line1}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">Line 2</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="apt. number" class="form-control line2" name="line2" value="{{$customer->address->last()->line2}}">
                                    </div>
                                </div>

                                <!-- Text input-->
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">City</label>
                                    <div class="col-sm-10">
                                        <input type="text" placeholder="City" class="form-control city" name="city" value="{{$customer->address->last()->city}}">
                                    </div>
                                </div>

                                <!-- Text input-->
                                <div class="row mb-4">
                                    <label class="col-sm-2 control-label" for="textinput">State</label>
                                    <div class="col-sm-4">
                                        <input type="text" placeholder="State" class="form-control state" name="state" value="{{$customer->address->last()->state}}">
                                    </div>

                                    <label class="col-sm-2 control-label" for="textinput">Zip</label>
                                    <div class="col-sm-4">
                                        <input type="text" placeholder="Post Code" class="form-control zip" name="zip" value="{{$customer->address->last()->zip}}">
                                    </div>
                                </div>
                            </div>
                            @endif --}}

                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success" type="submit">Update</button>
                            <a href="{{route('customer.show',['customer' => $customer])}}" class="btn btn-warning">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {{--Add new address modal--}}
    <div class="modal fade" id="add_new_address_model" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h6 class="modal-title">Add new address </h6> <a href="#" class="parse_btn" onclick="$('.parse_address_new').show(); return false;">parse</a><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>
                </div>
                <form method="post" action="{{ route('customer.add_address',['customer' => $customer]) }}">
                    @csrf
                    <div class="modal-body">
                        <textarea name="parse_address_new" style="display: none" class="parse_address_new form-control mb-2" onblur="parse_my_address_new(this)"></textarea>
                        <div class="row mb-4">
                            <label class="col-sm-2 control-label" for="textinput">Line 1</label>
                            <div class="col-sm-10">
                                <input type="text" placeholder="House number, street" class="form-control line1_new" name="line1" value="">
                            </div>
                        </div>
                        <div class="row mb-4">
                            <label class="col-sm-2 control-label" for="textinput">Line 2</label>
                            <div class="col-sm-10">
                                <input type="text" placeholder="apt. number" class="form-control line2_new" name="line2" value="">
                            </div>
                        </div>

                        <!-- Text input-->
                        <div class="row mb-4">
                            <label class="col-sm-2 control-label" for="textinput">City</label>
                            <div class="col-sm-10">
                                <input type="text" placeholder="City" class="form-control city_new" name="city" value="">
                            </div>
                        </div>

                        <!-- Text input-->
                        <div class="row mb-4">
                            <label class="col-sm-2 control-label" for="textinput">State</label>
                            <div class="col-sm-4">
                                <input type="text" placeholder="State" class="form-control state_new" name="state" value="">
                            </div>

                            <label class="col-sm-2 control-label" for="textinput">Zip</label>
                            <div class="col-sm-4">
                                <input type="text" placeholder="Post Code" class="form-control zip_new" name="zip" value="">
                            </div>
                        </div>
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
    <script type="text/javascript" src="{{ URL::asset('assets/js/parse-address.min.js')}}"></script>
    <script>
        function parse_my_address(d){
            var address  = $(d).val();
            var parsed = parseAddress.parseLocation(address);
            $('.line1').val(
                ((parsed.hasOwnProperty('number')) ? parsed.number+ " " : "")  +
                ((parsed.hasOwnProperty('prefix')) ? parsed.prefix+ " " : "")  +
                ((parsed.hasOwnProperty('street')) ? parsed.street+ " " : "")  +
                ((parsed.hasOwnProperty('type')) ? parsed.type+ " " : "")
            );
            $('.line2').val(
                ((parsed.hasOwnProperty('sec_unit_type')) ? parsed.sec_unit_type+ " " : "")  +
                ((parsed.hasOwnProperty('sec_unit_num')) ? parsed.sec_unit_num : "")
            );
            $('.city').val(((parsed.hasOwnProperty('city')) ? parsed.city+ " " : ""));
            $('.state').val(((parsed.hasOwnProperty('state')) ? parsed.state+ " " : ""));
            $('.zip').val(((parsed.hasOwnProperty('zip')) ? parsed.zip+ " " : ""));

        }
        function parse_my_address_new(d){
            var address  = $(d).val();
            var parsed = parseAddress.parseLocation(address);
            $('.line1_new').val(
                ((parsed.hasOwnProperty('number')) ? parsed.number+ " " : "")  +
                ((parsed.hasOwnProperty('prefix')) ? parsed.prefix+ " " : "")  +
                ((parsed.hasOwnProperty('street')) ? parsed.street+ " " : "")  +
                ((parsed.hasOwnProperty('type')) ? parsed.type+ " " : "")
            );
            $('.line2_new').val(
                ((parsed.hasOwnProperty('sec_unit_type')) ? parsed.sec_unit_type+ " " : "")  +
                ((parsed.hasOwnProperty('sec_unit_num')) ? parsed.sec_unit_num : "")
            );
            $('.city_new').val(((parsed.hasOwnProperty('city')) ? parsed.city+ " " : "sdf"));
            $('.state_new').val(((parsed.hasOwnProperty('state')) ? parsed.state+ " " : ""));
            $('.zip_new').val(((parsed.hasOwnProperty('zip')) ? parsed.zip+ " " : ""));

        }

        function edditAddress(d){
            $('.line1').val($(d).attr('data-line1'));
            $('.line2').val($(d).attr('data-line2'));
            $('.city').val($(d).attr('data-city'));
            $('.state').val($(d).attr('data-state'));
            $('.zip').val($(d).attr('data-zip'));
            $('.address_id').val($(d).attr('data-id'));
            $('.address_input_form').show();
        }
    </script>
@endsection
