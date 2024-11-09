<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
   <link href="{{ URL::asset('assets/css/book-appointment.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/plugins/edtimer/style.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/plugins/datetime-picker/css/pignose.calendar.css')}}" rel="stylesheet" />
   <title>view appointment online</title>
</head>
<body>
   @include('book-appointment.layout.header', ['company'=>$appointment->company,'title' => 'View Appointment Online'])
   <main>
      <div class="container mb-4">
         @include('layout.error-message')
         <div class="appointment_infor_conteiner">
            <div class="title">Appointment accepted!</div>
            <div class="title-line2">We're looking forward to seeing you on {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('M d') }} at {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A') }}</div>
            <hr>
            <div class="customer-information">
               <div class="customer-name">
                  {{ $appointment->customer->name }}
               </div>
               <div class="appointment-time">
                  {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('l, F d, Y') }}<br>
                  {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->start)->format('g:i A') }} - {{ \Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$appointment->end)->format('g:i A') }}
               </div>
               <div class="appointment-services">
                  @foreach ($appointment->services as $service)
                     <div class="appointment-service">{{ $service->title }} - ${{ $service->price }}</div>
                  @endforeach
               </div>

               <div class="customer-address">
                  {{ $appointment->address->line1 }}, {{ $appointment->address->line2 }}<br>
                  {{ $appointment->address->city }}, {{ $appointment->address->state }} {{ $appointment->address->zip }}<br>
                  {{ $appointment->customer->phone }}
               </div>

               <div class='row'>
                  <div class="col-md-5 col-10 mt-5 d-grid gap-2 m-auto">
                     <a href="#" class="btn btn-primary">Change appointment time</a>
                     <a href="/appointment/book/cancel/{{ $key }}" class="btn btn-primary">Cancel appointment</a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </main>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>