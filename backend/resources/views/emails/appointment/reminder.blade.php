<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
               <table width="700" border="0" cellspacing="0" cellpadding="20" style="background-color: #ffffff; margin-top: 20px; border: 1px solid #dddddd;">
                  <tr>
                     <td align="center" style="font-size: 24px; color: #fff; padding: 20px; background-color: #007bff;">
                           Appointment Reminder
                     </td>
                  </tr>
                  <tr>
                     <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
                           <p>Appointment with: {{ $appointment->job->customer->name }}</p>
                           <p>Appointment Today at: {{ \Carbon\Carbon::parse($appointment->start)->format('g:i A') }}</p>
                           <p>Location: <a href={{ "https://www.google.com/maps?q=".$appointment->job->address->full}}> {{ $appointment->job->address->full }}</a></p>
                     </td>
                  </tr>
                  
                  <tr>
                     <td align="center" style="padding: 20px;">
                        
                         <a href="{{ env('APP_DEBUG') ? 'http://localhost:5173/appointment/'.$appointment->id : 'https://dev.edservicetx.com/appointment/'.$appointment->id }}" style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block; border-radius: 5px;">Open appointment</a>
                     </td>
                 </tr>
                
                 <tr>
                     <td style="font-size: 14px; color: #fff; line-height: 1.5; padding: 20px; background-color: #505050;">
                         <p>Best Regards,<br>{{ $appointment->company->name }}</p>
                     </td>
                 </tr>
            </td>
        </tr>
    </table>

</body>
</html>