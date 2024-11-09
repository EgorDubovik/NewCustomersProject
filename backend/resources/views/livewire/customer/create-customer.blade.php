<div>
    <form method="post" action="{{route('customer.store')}}">
        @csrf
        <div class="card-body">
            <h5 class="card-title">Customer Information</h5>
            @include('layout.error-message')
            <div style="margin-left: 20px;">
                <div class="row mb-4">
                    <label class="col-md-2 control-label">Full Name</label>
                    <div class="col-md-10">
                        <input type="text" class="form-control customer_name" placeholder="Customer Full Name" name="customer_name" value="">
                    </div>
                </div>
                <div class="row mb-4">
                    <label class="col-md-2 control-label">Phone</label>
                    <div class="col-md-10">
                        <input type="text" wire:model.live.debounce.300ms='phone' class="form-control customer_phone" placeholder="Phone number" name="customer_phone" value="{{ old('customer_phone') }}">
                    </div>
                </div>
                <div class="row mb-4">
                    <label class="col-md-2 control-label">Email</label>
                    <div class="col-md-10">
                        <input type="text" class="form-control customer_phone" placeholder="Email address" name="email" value="">
                    </div>
                </div>
            </div>

            <div class="category-create-address">Address  <a href="#" class="parse_btn" onclick="$('.parse_address').show(); return false;">parse</a></div>

            <textarea name="parse_address" style="display: none" class="parse_address form-control mb-2" onblur="parse_my_address(this)"></textarea>
            <div style="margin-left: 20px;">
                <div class="row mb-4">
                    <label class="col-sm-2 control-label" for="textinput">Line 1</label>
                    <div class="col-sm-10">
                        <input wire:model.live.debounce.300ms='address' type="text" placeholder="House number, street" class="form-control line1" name="line1">
                    </div>
                </div>
                <div class="row mb-4">
                    <label class="col-sm-2 control-label" for="textinput">Line 2</label>
                    <div class="col-sm-10">
                        <input  type="text" placeholder="apt. number" class="form-control line2" name="line2">
                    </div>
                </div>

                <!-- Text input-->
                <div class="row mb-4">
                    <label class="col-sm-2 control-label" for="textinput">City</label>
                    <div class="col-sm-10">
                        <input type="text" placeholder="City" class="form-control city" name="city">
                    </div>
                </div>

                <!-- Text input-->
                <div class="row mb-4">
                    <label class="col-sm-2 control-label" for="textinput">State</label>
                    <div class="col-sm-4">
                        <input type="text" placeholder="State" class="form-control state" name="state">
                    </div>

                    <label class="col-sm-2 control-label" for="textinput">Zip</label>
                    <div class="col-sm-4">
                        <input type="text" placeholder="Post Code" class="form-control zip" name="zip">
                    </div>
                </div>
            </div>
        </div>
        {{-- {{ $customers }} --}}
        @if (count($customers) > 0)
            <div class="suggested">
                <div class="suggested_title">Suggested:</div>
                @foreach ($customers as $customer)
                    <div class="suggested_customer">
                        <div class="customer_info">
                            <div class="customer_name"><a href="{{ route('customer.show',$customer) }}" >{{ $customer->name }}</a></div>
                            <div class="customer_phone_number"> {{ $customer->phone }} </div>
                        </div>
                        <div class="customer_address ">{{ $customer->address->last()->full }}</div>
                    </div>
                @endforeach
            </div>
        @endif
        <div class="card-footer">
            <button class="btn btn-success" type="submit">Create new customer</button>

        </div>
    </form>
</div>
