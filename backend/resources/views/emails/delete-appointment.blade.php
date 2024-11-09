<x-mail::message>

Appointment with {{ $appointment->job->customer->name }} has been deleted<br>
{{ $appointment->job->address->full }}
{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('l, F d, Y') }}<br>
{{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A') }} - {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->end)->format('g:i A') }}<br>

{{ config('app.name') }}
</x-mail::message>
