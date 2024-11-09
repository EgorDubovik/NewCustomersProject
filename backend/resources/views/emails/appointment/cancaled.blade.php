@extends('emails.layout')

@section('content')

<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
      <p>Customer <b>{{ $appointment->job->customer->name }}</b>, just canceled appointment</p>
   </td>
</tr>
<tr>
   <td>
      <table width="100%">
         <tr>
            <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 10px;">
               <p><strong>Appointment Details:</strong></p>
               <p>
                  <p>Time: {{  \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('l, F d, Y').' at '.\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A') }}</p>
                  <p>Address: {{ $appointment->job->address->full }}</p>
               </p>
            </td>
         </tr>
      </table>
   </td>
</tr>

@endsection