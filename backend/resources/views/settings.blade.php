@extends('layout.main')

@section('content')
    <div class="main-container container-fluid">

        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Settings</h1>
        </div>
        <!-- PAGE-HEADER END -->

        <!-- ROW-1 OPEN -->
        <div class="row">
            
            @include("layout/error-message")
            @include('layout/success-message', ['status' => 'success'])
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">Payment deposit</div>
                    <form method="post" action="{{ route('settings.deposit.store') }}">
                        @csrf
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-md-6 mb-0">
                                <label class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" onclick="changePaymentOption(this)" name="payment_deposit_type" value="0" {!! ($settings->payment_deposit_type==0) ? "checked" : "" !!} >
                                    <span class="custom-control-label">Amount deposit</span>
                                </label>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="background: #ededed;">$</span>
                                        <input type="text" class="form-control" {!! ($settings->payment_deposit_type==1) ? "readOnly" : "" !!} name="payment_deposit_amount" placeholder="Deposit price amount" value="{{ $settings->payment_deposit_amount }}">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6 mb-0">
                                <label class="custom-control custom-radio">
                                    <input type="radio" class="custom-control-input" onclick="changePaymentOption(this)" name="payment_deposit_type" value="1" {!! ($settings->payment_deposit_type==1) ? "checked" : "" !!}>
                                    <span class="custom-control-label">Procent deposit</span>
                                </label>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon" style="background: #ededed;">%</span>
                                        <input type="text" class="form-control" {!! ($settings->payment_deposit_type==0) ? "readOnly" : "" !!}  name="payment_deposit_amount_prc" placeholder="Deposit procent amount" value="{{ $settings->payment_deposit_amount_prc }}">
                                    </div>
                                </div>
                            </div>      
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                    </form>
                </div>
                {{-- <div class="card">
                    <div class="card-body">
                        <div class="list-group list-group-transparent mb-0 file-manager file-manager-border">
                            <h4>General</h4>
                            <div>
                                <a href="javascript:void(0);" class="list-group-item list-group-item-action  d-flex align-items-center px-0 border-top">
                                    <i class="fa fa-credit-card fs-18 me-2 text-success p-2"></i>Payments
                                </a>
                            </div>
                            <div>
                                <a href="javascript:void(0);" class="list-group-item list-group-item-action  d-flex align-items-center px-0">
                                    <i class="fe fe-tag fs-18 me-2 text-secondary p-2"></i>Tags
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div> --}}
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Tags <a class="fs-16 text-orange" style="margin-left: 20px;" data-bs-toggle="modal" href="#add_new_tag_model"><i class="fe fe-plus-circle"></i> </a></div>
                    <div class="card-body">
                        @foreach(\Illuminate\Support\Facades\Auth::user()->company_tags as $tag)
                            <span class="tag tag-rounded tag-icon tag-orange">{{$tag->title}} <a href="{{route('tag.delete',['tag'=>$tag])}}" class="tag-addon tag-addon-cross tag-orange"><i class="fe fe-x text-white m-1"></i></a></span>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <!-- ROW-1 CLOSED -->
    </div>
    {{--Add new tag model--}}
    <div class="modal fade" id="add_new_tag_model" aria-hidden="true">
        <div class="modal-dialog modal-sm text-center" role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h6 class="modal-title">Add new tag</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>
                </div>
                <form method="post" action="{{route('tag.store')}}">
                    @csrf
                    <div class="modal-body">
                        <input class="form-control mb-4" placeholder="Tag title" name="title" type="text">
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" type="submit">Add</button>
                        <button class="btn btn-light" onclick="return false;" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@stop

@section("scripts")
    <script>
        function changePaymentOption(d){
            var paymnent_type = $(d).val();
            if(paymnent_type == 1){
                $('input[name="payment_deposit_amount_prc"]').prop('readonly',false);
                $('input[name="payment_deposit_amount"]').prop('readonly',true);
            } else {
                $('input[name="payment_deposit_amount_prc"]').prop('readonly',true);
                $('input[name="payment_deposit_amount"]').prop('readonly',false);
            }
        }
    </script>
@endsection
