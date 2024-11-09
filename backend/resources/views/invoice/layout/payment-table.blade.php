<table style="width: 50%;" align="right" border=0>
   @foreach ($payments as $payment)
   <tr>
       <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('M d Y') }}</td>
       <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('g:i A') }}</td>
       <td>{{ App\Models\Payment::getPaymentTypeText($payment->payment_type) }}</td>
       <td>${{ number_format($payment->amount,2) }}</td>
   </tr>
   @endforeach
</table>