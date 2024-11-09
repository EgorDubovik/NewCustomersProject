<a href="{{ route('appointment.show',['appointment'=>$appointment]) }}" class="a-open-appointment">
   <div class="row open-app-item align-items-center" style="border-top: 3px solid {{ ($appointment->status == App\Models\Appointment::ACTIVE) ? ((count($appointment->techs) > 0) ? $appointment->techs[0]->color : '#1565C0') : '#ccc' }}">
      <div class="col-5">
         <div class="customer-name">{{ $appointment->services[0]->title }}</div>
         <div class="customer-phone">
            <span class="text-muted fs-14 mx-2 fw-normal">{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->start)->format('M d Y') }}</span>
               {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->start)->format('H:i') }} -
               {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->end)->format('H:i') }}
         </div>
      </div>
      <div class="col-7">
         <div class="customer-address" style="text-align: right">
            @if ($appointment->remainingBalance() <= 0)
               <span class="tag tag-outline-success" id="total_on_span" style="margin-left: 30px;">Paid full </span>    
            @else
               <span class="tag tag-outline-danger" id="total_on_span" style="margin-left: 30px;">Total due: ${{ $appointment->remainingBalance() }}</span>
            @endif
         </div>
      </div>
   </div>
</a>