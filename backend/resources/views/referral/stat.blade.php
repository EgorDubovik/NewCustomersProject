<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
   <link href="{{ URL::asset('assets/css/book-appointment.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/plugins/edtimer/style.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/css/mystyle.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/css/style.css')}}" rel="stylesheet" />
    
    
    
   
   <title>Referral statistics</title>
</head>
<body>
   @include('book-appointment.layout.header', ['company' => $company, 'title' => 'Your referral statistics'])
   <main>
      <div class="container mb-4 referral_text">
         @include('layout.error-message')
         <div class="referral-stat" style="margin-top: 100px">
            <p>You have <span class="referral-count"><b>{{ count($stats) }}</b></span> referrals</p>
            <p>You can share this referral link: 
               <a style="margin-left: 30px" href="{{ route('referral',$code) }}"><span class="referral-link"><b>{{ route('referral', ['code' => $code]) }}</b></span></a>
               <br>with your friends and get up to <b>${{ $upto }}</b></p>

         </div>
         <div class="referral-progress-bar" style="margin-top: 100px">
            <ul>
               @foreach ($referralRange as $range)
                  <li>
                     <div class="discout-price">
                        <span class="{{ ($range->procent >= 100 ) ? "active" : "" }}">${{ $range->discount }}</span>
                     </div>
                     <div class="progress progress-sm mb-3">
                        <div class="progress-bar bg-primary" style="width: {{ $range->procent }}%;"></div>
                     </div>
                     <div class="referral-count">
                        <span>{{ $range->referral_count }} share</span>
                     </div>
                  </li>   
               @endforeach
            </ul>
            
         </div>
         <div class="hr"></div>
         <div class="row call-action">
            <div class="col-md-6 m-auto">
               <a href="tel:{{ $company->phone }}" class="btn btn-primary btn-block" >Call {{ $company->phone }}</a>
            </div>

            @if ($company->bookAppointment && $company->bookAppointment->active)
                <div class="col-md-6">
                    <a href="{{ route('appointment.book', ['key' => $company->bookAppointment->key]) }}" class="btn btn-primary btn-block" >Book appointment</a>
                </div>
            @endif
           
         </div>
      </div>
   </main>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
   <script src="{{ URL::asset('assets/plugins/datetime-picker/js/pignose.calendar.js') }}" ></script>
   <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
   <script src="{{ URL::asset('assets/plugins/edtimer/timer.mini.js')}}"></script>
</body>
</html>