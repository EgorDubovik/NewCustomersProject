<div>
    <div class="form-group">
        <div class="row">
            <div class="col-9">
                <div class="input-group">
                    <input wire:model.live.debounce.300ms='search' type="text" id="search_bar" class="form-control" placeholder="Search in customers">
                    {{-- <button class="btn btn-secondary" type="button" onclick="search_f($('#search_bar').val())">
                        <i class="fa fa-search"></i>
                    </button> --}}
                </div>
            </div>
            <div class="col-3">
                <a href="{{ route('customer.create') }}" class="btn btn-success w-100"><i class="fe fe-user-plus"></i> <span class="d-none d-lg-inline">New customer</span></a>
            </div>
        </div>
    </div>
   
    <div class="row">
        
        @foreach($customers as $customer)
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body" style="padding-bottom: 10px;">
                        <div class="media m-0 mt-0">
                            <div class="customer avatar avatar-md me-3">
                                @if ($customer->appointments->last())
                                    {{ \Carbon\Carbon::parse($customer->appointments->last()->end)->formatLocalized('%b') }}  <br>
                                    {{ \Carbon\Carbon::parse($customer->appointments->last()->end)->format('d') }}
                                    
                                @endif
                                
                            </div>
                            <div class="media-body">
                                <a href="{{route('customer.show',['customer'=>$customer->id])}}" class="text-default fw-semibold">{{$customer->name}}</a>
                                <p class="text-muted ">
                                    {{$customer->phone}}
                                    <i class="fe fe-copy pull-right text-secondary" style="cursor: pointer"></i>
                                    <a href="#"> <i class="fe fe-phone-call pull-right" style="margin-right: 10px;"></i></a>
                                </p>
                            </div>
                        </div>

                        <div class="media-body border-bottom" style="padding-bottom: 10px;">
                            <div class="d-flex align-items-center">
                                <div class="mt-0">
                                    <h5 class="mb-1 fs-13 fw-semibold  " style="color: #1170e4 ">{{$customer->address->last()->full}}</h5>
                                </div>
                                <span class="ms-auto fs-14">
                                    <span class="float-end">
                                        <span class="op-7 text-muted"><a href="#"> <i class="fe fe-map-pin"></i></a></span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="row" style="padding-top: 5px;">
                            <div class="col-8">
                                @if ($customer->appointments->last())
                                    <small class="text-muted"> Last visit: {{ \Carbon\Carbon::parse($customer->appointments->last()->end)->diffForHumans()}}</small>
                                @else
                                <small class="text-muted"> No last visit</small>
                                @endif
                            </div>
                            <div class="col-4 text-end">
                                <small class="text-muted"> {{count($customer->appointments)}} visits </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
            
        @if ($customers->isEmpty())
            <div class="col">
                <div class="alert alert-light text-center" role="alert">
                    <span class="alert-inner--text">List is eampty... <a style="margin-left: 20px;" href="{{ route('customer.create') }}">Create new customer</a></span>
                </div>
            </div>
        @endif
            
    </div>
</div>
