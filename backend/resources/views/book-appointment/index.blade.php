<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
   <link href="{{ URL::asset('assets/css/book-appointment.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/css/mystyle.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/css/style.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/plugins/edtimer/style.css')}}" rel="stylesheet" />
   <link href="{{ URL::asset('assets/plugins/datetime-picker/css/pignose.calendar.css')}}" rel="stylesheet" />
   <title>Book appointment online</title>
</head>
<body>
   @include('book-appointment.layout.header', ['company' => $company, 'title' => 'Book appointment online'])
   <main>
      <div class="container mb-4">
         @include('layout.error-message')
         <div class="conteiner-tab">
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
               <li class="nav-item" role="presentation">
                 <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-index=1 aria-selected="true">Select service</button>
               </li>
               <li class="nav-item" role="presentation">
                 <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-index=2 aria-selected="false" disabled>Select date and time</button>
               </li>
               <li class="nav-item" role="presentation">
                 <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-index=3 aria-selected="false" disabled>Enter your details</button>
               </li>
            </ul>
            <form action="/appointment/book/create/{{ $key }}" method="post">
               @csrf
            <div class="tab-content" id="pills-tabContent" style="padding-bottom: 40px">
               <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                  <div class="row">
                     <div class="col-md-3 mb-2 d-none d-sm-block">
                        <ul class="list-group list-group-flush" id="service-list">
                           
                        </ul>
                     </div>
                     <div class="col-md-9">
                        <div class="row">
                           @foreach ($company->services as $service)
                              <div class="col-md-3">
                                 <div class="card card-box" data-check = "false" data-service-title='{{ $service->title }}'  data-service-id="{{ $service->id }}" onclick="checkService(this)">
                                    <div class="card-header service-head">
                                       <div class="card-title mb-0">
                                          {{ $service->title }} 
                                          <span class="double-price">${{ $service->price }}</span>
                                       </div>
                                       <div class="cont-icon">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                                             <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                             <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                                          </svg>
                                       </div>
                                    </div>
                                    <div class="card-body pb-1">
                                       <p class="service-description">{{ $service->description }}</p>
                                       <p class="service-price">${{ $service->price }}</p>
                                    </div>
                                 </div>   
                              </div>
                           @endforeach
                        </div>
                     </div>
                  </div>
                  <div class="text-end button-next"><button class="btn btn-primary" onclick="nextTab('service');return false;" id="serviceNextBtn" disabled>Next</button> </div>
               </div>
               <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                  <div class="row">
                     <div class="col-md-3 mb-2">
                        <div class="choose-conteiner">
                           <div class="line1"></div>
                           <div class="line2"></div>
                        </div>
                     </div>
                     <div class="col-md-9">
                        <div class="time-title">Select your preferred date and time</div>
                        <div id="calendar"></div>
                        <input type="hidden" name="datetime" id="datetime" value=""/>
                        <div class="hours-conteiner">
                           <div class="time-title">Time:</div>
                           <div class="hours" id="hours">

                           </div>
                        </div>
                     </div>
                  </div>
                  
               </div>
               <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                  <div class="row" style="position: relative; padding-bottom:20px">
                     <div class="appointment-create loading" style="display: none">
                        <div class="spinner-border text-primary" role="status" style="position: relative;top:50%">
                           <span class="visually-hidden">Loading...</span>
                        </div>
                        
                     </div>
                     <div class="col-sm-7 col-9 m-auto">
                        <div class="time-title">Enter your details below</div>
                        
                        <div class="row g-3 mt-3">
                           <div class="col-md-6">
                             <input type="text" name="name"  class="form-control" placeholder="First and last name">
                           </div>
                           <div class="col-md-6">
                             <input type="text" name="phone_number" class="form-control" placeholder="Phone number">
                           </div>
                           <div class="col-12">
                              <input type="text" name="email" class="form-control" placeholder="Email">
                           </div>

                           <div style="font-size: 14px;margin-top: 24px;color: #666;">Address information</div>

                           <div class="col-12">
                             <input type="text" name="address_line1" class="form-control" placeholder="Address line">
                           </div>
                           <div class="col-12">
                             <input type="text" name="address_line2" class="form-control" placeholder="Address line 2">
                           </div>
                           <div class="col-md-6">
                             <input type="text" name="city" class="form-control" placeholder="City">
                           </div>
                           <div class="col-md-4">
                              <input type="text" name="state" class="form-control" placeholder='State'>
                           </div>
                           <div class="col-md-2">
                             <input type="text" name="zip" class="form-control" placeholder="Zip code">
                           </div>
                           <div class="col-12">
                              <textarea class="form-control" name="desciption" rows="2" placeholder="Descriptions"></textarea>
                           </div>
                        </div>
                        <div class="d-grid gap-2 mt-4">
                           <button class="btn btn-primary" type="submit" onclick="sendform(this)">Create appointment</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            </form>
         </div>
      </div>
   </main>

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
   <script src="{{ URL::asset('assets/plugins/datetime-picker/js/pignose.calendar.js') }}" ></script>
   <script src="https://hammerjs.github.io/dist/hammer.min.js"></script>
   <script src="{{ URL::asset('assets/plugins/edtimer/timer.mini.js')}}"></script>
   <script>

      function sendform(d){
         $(d).addClass('disable');
         $('.appointment-create.loading').show();
      }

      let services = [];
      function checkService(d){
         
         let card = $(d);
         let isChecked = card.attr('data-check');
         if(isChecked == 'true'){
            card.attr('data-check','false');
            card.removeClass('border-primary');
         } else {
            card.attr('data-check','true');
            card.addClass('border-primary');
         }
         reRenderListService();
      }

      function reRenderListService(){
         services = [];
         $('.card-box').each(function(){
            let isChecked = $(this).attr('data-check');
            if(isChecked == 'true'){
               services.push({
                  'title'  : $(this).attr('data-service-title'),
                  'id'     : $(this).attr('data-service-id'),
               });
            }
         });
         $('#service-list').empty();
         services.forEach(service => {
            $('#service-list').append('<li class="list-group-item"><input type="hidden" name="service[]" value="'+service.id+'" />'+service.title+'</li>');
         });

         if(services.length == 0){
            disableNextBtn('#serviceNextBtn');
         } else {
            activeNextBtn('#serviceNextBtn');
         }
      }

      function nextTab(place){
         if(place == 'service'){
            $('#pills-profile-tab').tab('show');
         }
      }

      function disableNextBtn(id){
         $(id).prop('disabled', true);
      }

      function activeNextBtn(id){
         $(id).removeAttr('disabled');
      }
   </script>

   <script>
      let originTime = moment().minute(0).add(1,'hour');
      $(document).ready(function(){
         $('#calendar').pignoseCalendar({
            theme : 'blue',
            disabledRanges : [
               ['2017-08-01',moment().add(-1,'days').format('YYYY-MM-DD')]
            ],
            select : function(date){
               let newDate = date[0].format('YYYY-MM-DD');
               originTime = moment(newDate+" "+originTime.format('HH:mm'));
               setTime(originTime);
               viewHoursBtn();
            }
         });

         setTime(originTime);
         viewHoursBtn();
      });

      function viewHoursBtn(){
         let startHour = originTime.isSame(new Date(), 'day') ? originTime.clone() : originTime.clone().hour(8);
         let endHour = originTime.clone().hour(18);
         $('#hours').empty();
         while(startHour <= endHour){
            $('#hours').append('<button class="btn btn-outline-primary hourBtn" onClick="selectHour(this);return false;" data-hour = "'+startHour.format('HH:mm')+'" >'+startHour.format('hh:mm a')+'</button>')
            startHour.add(1,'hour');
         }
      }

      function selectHour(d){
         let hour = $(d).attr('data-hour');
         console.log(hour);
         originTime = moment(originTime.format('YYYY-MM-DD')+' '+hour);
         setTime(originTime);
         $('#pills-contact-tab').tab('show');
      }

      function setTime(time){
         $('#datetime').val(time.format('YYYY-MM-DD HH:mm'));
         $('.choose-conteiner .line1').html(time.format('dddd, MMMM DD, YYYY'));
         $('.choose-conteiner .line2').html('between '+time.format('hh:mm a')+"-"+time.clone().add(2,'hour').format('hh:mm a'));
      }
   </script>
</body>
</html>