@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header" style="margin-top: 10px; margin-bottom: 10px;">
            <h1 class="page-title">Payments
               <span class="payments-dates"> <span style="cusrsor:pointer" onclick="$('.data-range-payments').toggle();$('.overlay-data-rage').show()">{{ $period['startDate'] }} - {{ $period['endDate'] }}</span>
                  <div class="data-range-payments">
                     <div class="row">
                        <div class="col-sm">
                           <ul class="list-group list-group-flush">
                              <li class="list-group-item list-group-item-action" onclick="setNewRange('today')">Today</li>
                              <li class="list-group-item list-group-item-action" onclick="setNewRange('thisWeek')">This week</li>
                              <li class="list-group-item list-group-item-action" onclick="setNewRange('thisMonth')">This month</li>
                              <li class="list-group-item list-group-item-action" onclick="setNewRange('last30Days')">Last 30 days</li>
                           </ul>
                        </div>
                        <p>or</p>
                        <div class="col-sm">
                           <div id="calendar"></div>
                        </div>
                     </div>
                  </div>
               </span>
               
            </h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                   
                    <div class="card-body">
                        <div id="morrisBar2" class="chartsh"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4">
               <div class="card">
                  <div class="card-body text-center">
                     <i class="fa fa-line-chart text-secondary fa-2x"></i>
                     <h6 class="mt-4 mb-2">Total per period</h6>
                     <h2 class="mb-2  number-font">${{ number_format($total['main'],2,'.',' ') }}</h2>
                  </div>
               </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-2">
               <div class="card">
                  <div class="card-body text-center">
                     <i class="fa fa-credit-card text-secondary fa-2x"></i>
                     <h6 class="mt-4 mb-2">Credit transaction</h6>
                     <h2 class="mb-2  number-font">${{ number_format($total['credit'],2,'.',' ') }}</h2>
                  </div>
               </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-2">
               <div class="card">
                  <div class="card-body text-center">
                     <i class="fa fa-mobile text-secondary fa-2x"></i>
                     <h6 class="mt-4 mb-2">Transfer transaction</h6>
                     <h2 class="mb-2  number-font">${{ number_format($total['transfer'],2,'.',' ') }}</h2>
                  </div>
               </div>               
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-2">
               <div class="card">
                  <div class="card-body text-center">
                     <i class="fa fa-dollar text-secondary fa-2x"></i>
                     <h6 class="mt-4 mb-2">Cash transaction</h6>
                     <h2 class="mb-2  number-font">${{ number_format($total['cash'],2,'.',' ') }}</h2>
                  </div>
               </div>               
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 col-xl-2">
               <div class="card">
                  <div class="card-body text-center">
                     <i class="fa fa-dollar text-secondary fa-2x"></i>
                     <h6 class="mt-4 mb-2">Check transaction</h6>
                     <h2 class="mb-2  number-font">${{ number_format($total['check'],2,'.',' ') }}</h2>
                  </div>
               </div>               
            </div>
        </div>
        <div class="row">
            <div class="card">
               <div class="card-body">
                  <div class="table-responsive push">
                     <table class="table text-nowrap text-md-nowrap mb-0">
                        <thead>
                           <th style="width: 100px">id</th>
                           <th>Customer</th>
                           <th>Appointment</th>
                           <th>Amount</th>
                           <th>Day of payment</th>
                           <th>Payment type</th>
                           <th style="width: 50px">Action</th>
                        </thead>
                        <tbody>
                           @foreach ($payments as $payment)
                              <tr>
                                 <td>{{ $payment->id }}</td>
                                 <td><a href="{{ route('customer.show',['customer' =>$payment->appointment->customer ]) }}">{{  $payment->appointment->customer->name }}</a></td>
                                 <td><a href="{{ route('appointment.show',['appointment' =>$payment->appointment ]) }}">Appointment at <b>{{  $payment->appointment->start }}</b></a></td>
                                 <td>${{ $payment->amount }}</td>
                                 <td>{{ $payment->created_at->format('m-d-Y') }}</td>
                                 <td><span class="badge bg-success-transparent rounded-pill text-success p-2 px-3">{{ \App\Models\Payment::TYPE[$payment->payment_type-1] }}</span></td>
                                 <td><a href="{{ route('payment.remove',['payment' => $payment]) }}" onclick="return confirm('Are you sure?');" class="btn text-danger btn-sm"><span class="fe fe-trash-2 fs-14"></span></a></td>
                              </tr>   
                           @endforeach
                     </table>
                  </div>
               </div>
            </div>
        </div>
        <div class="overlay-data-rage" onclick="$('.data-range-payments').hide(); $(this).hide()"></div>
    @stop
    @section('scripts')
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/datedreamer@0.2.6/dist/datedreamer.js"></script>
      <script src="{{ URL::asset('assets/plugins/morris/morris.js') }}"></script>
      <script src="{{ URL::asset('assets/plugins/morris/raphael-min.js') }}"></script>

      <script>            
         var morris = new Morris.Area({
            element: 'morrisBar2',
            data: @json($paymentForGraph),
            xkey: 'day',
            ykeys: ['total'],
            lineColors: ['#6c5ffc'],
            labels: ['amount'],
            xaxisLabel: 'Day',
            xLabelFormat: d => moment(d).format('MMM D'), 
            yLabelFormat: d => '$'+d, 
            xLabels: 'day',
            resize: true
         }).on('click', function(i, row) {
            console.log(i, row);
         });

         var calendar = new datedreamer.range({
                           element: "#calendar",
                           theme:"lite-purple",
                           onChange: (e) => {
                              getNewData({
                                 startDate : moment(e.detail.startDate).format('YYYY-MM-DD'),
                                 endDate : moment(e.detail.endDate).format('YYYY-MM-DD'),
                              });
                           },
                        });
         function setNewRange(rangeType){
            switch (rangeType) {
               case 'today':
                  var result = {
                     startDate : moment().format('YYYY-MM-DD'),
                     endDate   : moment().format('YYYY-MM-DD'),
                  }
               break;
               case 'thisWeek':
                  var result = {
                     startDate : moment().startOf('week').format('YYYY-MM-DD'),
                     endDate   : moment().endOf('week').format('YYYY-MM-DD'),
                  }
               break;
               case 'thisMonth':
                  var result = {
                     startDate : moment().startOf('month').format('YYYY-MM-DD'),
                     endDate   : moment().endOf('month').format('YYYY-MM-DD'),
                  }
               break;

               case 'last30Days':
                  var result = {
                     startDate : moment().add(-30, 'days').format('YYYY-MM-DD'),
                     endDate   : moment().format('YYYY-MM-DD'),
                  }
               break;
               
            }
            getNewData(result)
         }
         
         function getNewData(range){
            window.location = "?startDate="+range.startDate+"&endDate="+range.endDate
         }
      </script>
      
      <script>
         // $('body').click(function(){
         //    $('.data-range-payments').hide();
         // })
      </script>
    @endsection
