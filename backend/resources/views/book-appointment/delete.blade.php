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
   @include('book-appointment.layout.header', ['company'=>$company,'title' => 'View Appointment Online'])
   <main>
      <div class="container mb-4">
         <div class="appointment_infor_conteiner">
            <div class="title">Your appointment has been removed!</div>
            @if (Session::has('key'))
               <a href="/appointment/book/{{ Session::get('key') }}" class="btn btn-primary mt-5">Make new appointment</a>    
            @endif
         </div>
      </div>
   </main>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>