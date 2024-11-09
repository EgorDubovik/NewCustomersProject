@extends('emails.layout')

@section('content')
<tr>
    <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
        <p>Dear <b>{{ $invoice->job->customer->name }}</b>,</p>
        <p>Thank you for allowing us to service your appliance. Attached is your invoice for the repair completed on
            {{ \Carbon\Carbon::parse($invoice->created_at)->format('M d Y') }}.</p>

    </td>
</tr>
<tr>
    <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 0 20px;">
        <p style="text-align: center;">We'd love to hear your feedback! How was your experience?</p>
        <p style="text-align: center;">
            <a href="https://g.page/r/CWjtj_kg614sEBM/review" style="text-decoration: none; font-size: 40px;margin-right: 30px;">😃</a>
            &nbsp;&nbsp;&nbsp;
            <a href="{{ env('BOOK_APP_BASE_URL') . '/review-feedback/' . $invoice->key }}"
                style="text-decoration: none; font-size: 40px; margin-right: 30px;">😐</a>
            &nbsp;&nbsp;&nbsp;
            <a href="{{ env('BOOK_APP_BASE_URL') . '/review-feedback/' . $invoice->key }}"
                style="text-decoration: none; font-size: 40px;">😞</a>
        </p>
    </td>
</tr>
<tr>
    <td>
        <table width="100%">
            <tr>
                <td style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;">
                    <p><strong>Customer Information:</strong></p>
                    <p>
                        {{ $invoice->job->customer->name }}<br>
                        {{ $invoice->job->customer->email }}<br>
                        {{ $invoice->job->address->full }}<br>
                    </p>
                </td>
                <td align="right"
                    style="font-size: 16px; color: #666666; line-height: 1.5; padding: 20px;vertical-align:top">
                    <p><strong>Company Information:</strong></p>
                    <p>
                        {{ $invoice->company->name }}<br>
                        {{ $invoice->company->phone }}<br>
                        {{ $invoice->company->email }}<br>

                    </p>
                </td>
            </tr>
        </table>
    </td>
</tr>
<tr>
    <td>
        <p><strong>Services Provided:</strong></p>
        <table width="100%">
            <tr style="background-color: #cdcdcd; ">
                <td style="padding: 10px; color: #767676; ">Description</td>
                <td style="text-align: center; padding: 10px;color: #767676; ">Quantity</td>
                <td style="text-align: right; padding: 10px; color: #767676;">Price</td>
            </tr>
            @foreach ($invoice->job->services as $service)
                <tr>
                    <td style="padding: 10px; border-bottom:1px solid #ccc">
                        <p style="margin: 5px 0;"><b>{{ $service->title }}</b></p>
                        <p style="color: #666666; margin: 5px 0;">{{ $service->description }}</p>
                    </td>
                    <td style="text-align: center; border-bottom:1px solid #ccc">1</td>
                    <td style="text-align: right; border-bottom:1px solid #ccc">{{ number_format($service->price, 2) }}
                    </td>
                </tr>
            @endforeach
            <tr>
                <td colspan="2" style="text-align: right;">
                    <p style="margin: 5px 0; color: #666666;text-align: right">Tax:</p>

                </td>
                <td style="text-align: right;">${{ number_format($invoice->job->total_tax, 2) }}</td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: right;">
                    <p style="margin: 5px 0; color: #666666;text-align: right">Total</p>

                </td>
                <td style="text-align: right;">${{ number_format($invoice->job->total_amount, 2) }}</td>
            </tr>

        </table>


        <p><strong>Payment Information:</strong></p>
        <table width="100%">
            <tr>
                <td width="50%">
                    <table width="100%" style="color: #666666;">
                        @foreach ($invoice->job->payments as $payment)
                            <tr>
                                <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('M d Y') }}
                                </td>
                                <td>{{ App\Models\Payment::getPaymentTypeText($payment->payment_type) }}</td>
                                <td>${{ number_format($payment->amount, 2) }}</td>
                            </tr>
                        @endforeach

                    </table>
                </td>
                <td width="50%" align="center" style="font-weight: bold; color: #007bff;">
                    Total due: ${{ number_format($invoice->job->remaining_balance, 2) }}
                </td>
            </tr>
        </table>
    </td>
</tr>
<tr>
    <td align="center" style="padding: 20px;">
        <p style="color: #666666; text-align: center">Please click the button below to download your invoice as a PDF.</p>
        <a href="{{ $invoice->pdf_url }}"
            style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; display: inline-block; border-radius: 5px;">⬇️
            Download Invoice (PDF)</a>
    </td>
</tr>
@endsection