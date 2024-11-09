@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Create new Customer</h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="card col-md-6 m-auto">
                <livewire:customer.create-customer />
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
    </script>
@endsection
