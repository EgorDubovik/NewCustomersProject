@extends('emails.layout')

@section('content')
<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
      <p>Customer <b>{{ $appointment->job->customer->name }}</b>, just schedule appointment</p>
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
<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 10px;">
      <p><strong>Services requested:</strong></p>
      <table width="100%">
         @foreach ($appointment->job->services as $service)
            <tr>
               <td style="padding: 10px; border-bottom: 1px solid #ccc;">
                  <p style="margin: 5px 0;"><b>{{ $service->title }}</b></p>
                  <p style="color: #666666; margin: 5px 0;">{{ $service->description }}</p>
               </td>
               <td style="text-align: right;">{{ $service->price }}</td>
            </tr>
         @endforeach
      </table>
   </td>
</tr>
<tr>
   <td align="center" style="padding: 20px;">
      <a href="{{ env('APP_DEBUG') ? 'http://localhost:5173/appointment/'.$appointment->id : 'https://dev.edservicetx.com/appointment/'.$appointment->id }}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block; border-radius: 5px;">Open appointment</a>
   </td>
</tr>
<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
      <p>If you need to make any changes to your appointment, feel free to reach out to us at <b>{{ $company->phone }}</b>, and we’ll be happy to assist you.</p>
   </td>
</tr>
@endsection