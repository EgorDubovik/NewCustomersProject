<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
               <div style="overflow: hidden; border-radius: 15px; width:700px; margin:20px auto">
                  <table width="700" border="0" cellspacing="0" cellpadding="20" style="background-color: #ffffff; border: 1px solid #dddddd;">
                     <tr>
                        <td align="center" style="font-size: 24px; color: #fff; padding: 20px; background-color: #126de5;">
                           {{ $headerTitle ?? 'Header content' }}
                        </td>
                     </tr>
                     
                     @yield('content')
                        
                     <tr>
                           <td style="font-size: 14px; color: #fff; line-height: 1.5; padding: 20px; background-color: #82899a;">
                              <p>If you have any questions or concerns, please contact us at {{ $company->phone ?? '[Phone number]' }}.</p>
                              <p>Best Regards,<br>{{ $company->name ?? '[Company name]' }}</p>
                           </td>
                     </tr>
                  </table>
               </div>
            </td>
        </tr>
    </table>
</body>
</html>