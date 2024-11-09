@extends('layout.main')

@section('css')
    <link href="{{ URL::asset('assets/plugins/edtimer/style.css')}}" rel="stylesheet" />
    <link href="{{ URL::asset('assets/plugins/typehead/jquery.typeahead.css')}}" rel="stylesheet" />
@endsection

@section('content')
   
    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Update Appointment</h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->        
        <div class="row">
            <div class="col-lg-4 m-auto">
                <div class="card">
                    <form method="post" action="{{route('appointment.update',["appointment"=>$appointment])}}" >
                        @csrf
                        <div class="card-body">    
                            @include("layout/error-message")
                            <div class="conteiner">
                                <div class="row mb-2">
                                    <div class="col-md-3">
                                        <div class="card-title">Customer</div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="content-customer-scheduling" onclick="openModal()">
                                            <input type="hidden" value="{{$appointment->address->id}}" name="address_id" id="input_address_id">
                                            <div> <span class="font-weight-bold" style="font-weight: bold" id="customer_name">{{$appointment->customer->name}}</span></div>
                                            <div class="text-muted" id="customer_address">{{$appointment->address->full}}</div>
                                            <div class="click-to-change">Click to change</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container time-picker-header">
                                <div class="card-title">Choose a time</div>
                                <div class="row timer-picker-row ">
                                    <input type="hidden" class="input_time_from" name="time_from" value="{{ $appointment->start }}">
                                    <input type="hidden" class="input_time_to" name="time_to" value=" {{ $appointment->end }}">
                                    <div class="col-6 header-item active" data-active = "from">
                                        <div class="row align-items-center">
                                            <div class="col-4 time-picker-title">From:</div>
                                            <div class="col-8 time-picker-date-cont set-time-from">
                                                <div class="time-picker-date">Jun 19</div>
                                                <div class="time-picker-time">11:00 AM</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 header-item " data-active = "to">
                                        <div class="row align-items-center">
                                            <div class="col-4 time-picker-title">To:</div>
                                            <div class="col-8 time-picker-date-cont set-time-to">
                                                <div class="time-picker-date">Jun 19</div>
                                                <div class="time-picker-time">11:00 AM</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                            <div class="date_wrapper">
                                <div class="timePicker" style="display: flex;justify-content: center"></div>
                            </div>
                            {{-- <div class="row mb-2">
                                <label  class="col-md-3 form-label">DateTime</label>
                                <div class="cont_time_from container-datepicker active">
                                    <input type="hidden" class="input_time_from" name="time_from" value="">
                                    <div class="view_selected_date_time">
                                        <div class="row">
                                            <div class="col-6">
                                                <span class="text-muted"> From:</span>
                                                <span class="date" style="margin-left: 30px;"></span>
                                            </div>
                                            <div class="col-6">
                                                <span class="text-muted"> Time:</span>
                                                <span class="time_from"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="date_wrapper outside">
                                        <div class="timePicker" style="display: flex;justify-content: center"></div>
                                    </div>
                                </div>
                                <div class="cont_time_to container-datepicker active" style="margin-top: 15px;">
                                    <input type="hidden" class="input_time_to" name="time_to" value="">
                                    <div class="view_selected_date_time">
                                        <div class="row">
                                            <div class="col-6">
                                                <span class="text-muted"> To:</span>
                                                <span class="date" style="margin-left: 30px;">{{date('M-d-Y')}}</span>
                                            </div>
                                            <div class="col-6">
                                                <span class="text-muted"> Time:</span>
                                                <span class="time_from">9:00 AM</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="date_wrapper outside">
                                        <div class="timePicker" style="display: flex;justify-content: center"></div>
                                    </div>
                                </div>
                            </div> --}}
                            
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success" type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal"  role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" onclick="return false;"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    @foreach($appointment->customer->address as $address)
                        <div class="content-customer-scheduling" style="margin-top: 10px;" onclick="choiceAddress(this, {{$address->id}})">
                            <div><span class="font-weight-bold choice_customer_name" style="font-weight: bold">{{$appointment->customer->name}}</span></div>
                            <div class="text-muted choice_customer_address">{{$address->full}}</div>
                            <div class="click-to-change"></div>
                        </div>
                    @endforeach
                </div>
                <div class="modal-footer">
                    <button class="btn btn-light" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
@stop
@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
    <script src="{{ URL::asset('assets/plugins/edtimer/timer.mini.js')}}"></script>

    <script>
        $(document).ready(function () {
            
            let timerTo = null;
            let nowActive = 'from';
            let timeToIsChanged = false;
            let timerFrom = $('.timePicker').timerD({
                setTime : "{{ $appointment->start }}",
                onChange : function(newTime){
                    let mtime = moment(newTime);
                    if(nowActive == 'from'){
                        $('.input_time_from').val(mtime.format('YYYY-MM-DD HH:mm'));
                        viewSetTime($('.set-time-from'),mtime);
                        if(!timeToIsChanged){
                            $('.input_time_to').val(mtime.add(2,'hour').format('YYYY-MM-DD HH:mm'));
                            viewSetTime($('.set-time-to'),mtime);
                        }
                    } else if(nowActive == 'to'){
                        timeToIsChanged = true;
                        $('.input_time_to').val(mtime.format('YYYY-MM-DD HH:mm'));
                        viewSetTime($('.set-time-to'),mtime);
                    }
                }
            });
            function viewSetTime(conteiner,time){
                conteiner.find('.time-picker-date').html(time.format('MMM DD'))
                conteiner.find('.time-picker-time').html(time.format('hh:mm A'))
            }
            
            $('.header-item').click(function (){
                nowActive = $(this).attr('data-active');
                if(!timerFrom)
                    return;

                if(nowActive == 'to'){
                    var timeTo = $('.input_time_to').val()
                    timerFrom.setTime(timeTo);
                } else if(nowActive == 'from'){
                    var timeFrom = $('.input_time_from').val()
                    timerFrom.setTime(timeFrom);
                }
                $('.header-item').removeClass('active');
                $(this).addClass('active');
            });
        });

        function openModal(){
            $('#exampleModal').modal('show');
        }

        function choiceAddress(d, address_id){
            $('#input_address_id').val(address_id)
            var address = $(d).find(".choice_customer_address").html();
            $("#customer_address").html(address);
            $('#exampleModal').modal('hide');
        }
    </script>
@endsection
