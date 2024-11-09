@extends('emails.layout')

@section('content')
<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
      <p>Dear <b>{{ $appointment->job->customer->name }}</b>,</p>
      <p>Thank you for choosing <b>{{ $company->name }}!</b> We’re excited to confirm that your appointment has been successfully scheduled. We truly appreciate your trust in us!</p>
   </td>
</tr>
<tr>
   <td>
      <table width="100%" style="background-color: #efefef;">
         <tr >
            <td style="font-size: 16px; line-height: 1.5; padding: 10px;">
               <p><strong>Appointment Details:</strong></p>
               <p>
                  <p>Time: {{  \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('l, F d, Y').' at '.\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A') }}</p>
                  <p>Address: {{ $appointment->job->address->full }}</p>
               </p>
            </td>
            <td  align="right" style="font-size: 16px; line-height: 1.5; padding: 20px;vertical-align:top">
               <p><strong>Company Information:</strong></p>
               <p>
                  {{ $company->name }}<br>
                  {{ $company->phone }}<br>
                  {{ $company->email }}<br>
               </p>
            </td>
         </tr>
      </table>
   </td>
</tr>
<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 10px;">
      <p style="text-align: center"><strong>Services requested:</strong></p>
      <table width="60%" align="center">
         @foreach ($appointment->job->services as $service)
            <tr>
               <td style="padding: 10px; border-bottom: 1px solid #ccc;">
                  <p style="margin: 5px 0;"><b>{{ $service->title }}</b></p>
                  <p style="color: #666666; margin: 5px 0;">{{ $service->description }}</p>
               </td>
               <td style="text-align: right;">${{ $service->price }}</td>
            </tr>
         @endforeach
      </table>
   </td>
</tr>

<tr>
   <td align="center" style="padding: 20px;">
      <a href="{{ env('APP_DEBUG') ? 'http://localhost:5173/appointment/book/view/'.$key : 'https://dev.edservicetx.com/appointment/book/view/'.$key }}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block; border-radius: 5px;">View appointment info</a>
   </td>
</tr>

<tr>
   <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
      <p>If you need to make any changes to your appointment, feel free to reach out to us at <b>{{ $company->phone }}</b>, and we’ll be happy to assist you.</p>
      <p>Thank you once again for booking with us! We look forward to seeing you soon.</p>
   </td>
</tr>
@endsection