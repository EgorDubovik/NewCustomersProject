@extends('layout.main')

@section('css')
    <link href="{{ URL::asset('assets/css/myCalendar.css')}}" rel="stylesheet" />
@endsection

@section('content')
<div class="main-container container-fluid">
    <!-- PAGE-HEADER -->
    <div class="page-header">
        <h2 class="page-title">Schedule calendar</h2>
    </div>
    <!-- PAGE-HEADER END -->
    <!-- CONTENT -->
    <div class="row">
        <div class="col-md-9">
            <div class="card">
                <div class="card-body">
                    <div id="calendar">

                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <div class="card-header">Open appointments ({{ count($appointments->where('status',0)) }})</div>
                <div class="card-body">
                    @forelse ($appointments->where('status',0) as $open_appointment)  
                        @if ($open_appointment && $open_appointment->customer)
                            @include('schedule.inludes.open-appointments',['appointment' => $open_appointment])    
                        @endif              
                        
                    @empty
                        <div class="empty_open_appointments">You don`t have any open appointments</div>
                    @endforelse
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <a href="{{ route('appointment.map') }}"><i class="fe fe-map-pin"></i> view all on map</a>
                </div>
            </div>
        </div>
        
    </div>
    <!-- ROW-1 CLOSED -->
</div>
<div class="modal fade" id="update-appintment-time" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
        <form method="POST" onsubmit="return updateAppointmentTime(this)">
            <input type="hidden" id="appointment_id" name="appointment_id">
            <input type="hidden" id="time_from" name="startTime">
            <input type="hidden" id="time_to" name="endTime">
            
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Change appointment time</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                </div>
                <div class="modal-body">
                    <p>Appointment with: <spam id="customerName" style="font-weight: bold">Yahor Dubovik</spam></p>
                    <p>Change to: <br><spam id="changeTimeTo" style="font-weight: bold"></spam></p>
                </div>
                <div class="modal-footer">
                    <button type='button' class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </form>
    </div>
</div>
@stop

@section('scripts')
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script src="{{ URL::asset('assets/js/ealena.mini.js')}}"></script>
    <script>
        $(document).ready(function(){
            $('#calendar').edEvents({
                startTime : '06:00',
                endTime: '21:00',
                dayOrWeek : ($(document).width() >= 576 ) ? 'week' : 'days',
                events : [
                    @foreach ($appointments as $appointment)
                        @if ($appointment && $appointment->customer)
                            {
                                title: '{{ $appointment->customer->name }}', 
                                startTime: '{{ $appointment->start }}', 
                                endTime: '{{ $appointment->end }}',
                                background: "{{ ($appointment->status == App\Models\Appointment::ACTIVE) ? ((count($appointment->techs) > 0) ? $appointment->techs[0]->color : '#1565C0') : '#ccc' }}",
                                href: "{{ route('appointment.show',['appointment'=>$appointment]) }}",
                                addClass : "{{ ($appointment->status == App\Models\Appointment::DONE) ? 'done' : 'pedding'}}",
                                id : {{ $appointment->id }},

                            },
                        @endif
                    @endforeach 
                ],
                onEndDrag : function(appointment){
                    $('#customerName').html(appointment.title);
                    $('#changeTimeTo').html(moment(appointment.startTime).format('hh:mm A DD MMM') + " - "+moment(appointment.endTime).format('hh:mm A DD MMM'));
                    $('#appointment_id').val(appointment.id);
                    $('#time_from').val(appointment.startTime);
                    $('#time_to').val(appointment.endTime);
                    $('#update-appintment-time').modal('show');
                }
            });
        });

        function updateAppointmentTime(form){
            $.ajax({
                method:'post',
                url:"{{ route('appointment.update.time') }}",
                data:{
                    _token : "{{ csrf_token() }}",
                    appointment_id : form.appointment_id.value,
                    startTime : form.startTime.value,
                    endTime : form.endTime.value,
                    
                },
            }).done(function(data) {
                console.log(data);
                $('#update-appintment-time').modal('hide');
                return false;
                
            })
            .fail(function() {
                alert("error");
                return false;
            });

            return false;
        }
      </script>
@endsection

