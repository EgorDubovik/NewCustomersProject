@extends('layout.main')

@section('css')
    <link href="{{ URL::asset('assets/css/myCalendar.css')}}" rel="stylesheet" />
@endsection

@section('content')
<div class="main-container container-fluid">
   <!-- PAGE-HEADER -->
   <div class="page-header">
      <h2 class="page-title">All appointments on map</h2>
   </div>
   <!-- PAGE-HEADER END -->
   <!-- CONTENT -->
   <div class="row">
      <div class="card col-md-6">
         <div class="card-body">
            <div class="view_map_point" id="customer_map" style="height: 650px">

            </div>
         </div>
      </div>
      
   </div>
   <!-- ROW-1 CLOSED -->
</div>

@stop

@section('scripts')
<script async src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP') }}&callback=initMap"></script>
<script>

   let appointments = @json($appointments)

   let noPoi = [{
      featureType: "poi",
      stylers: [{
         visibility: "off"
      }]
   }];
   let map;
   let geocoder;

   function initMap() {
      geocoder = new google.maps.Geocoder();
      let point = {
         lat: -34.397,
         lng: 150.644
      };
      map = new google.maps.Map(document.getElementById("customer_map"), {
         center: point,
         zoom: 13,
         disableDefaultUI: true,
      });
      addMarkers();
      map.setOptions({
         styles: noPoi
      });
   }

   function addInfoWindow(marker, message) {
      var infoWindow = new google.maps.InfoWindow({
         content: message
      });
      google.maps.event.addListener(marker, 'click', function () {
         infoWindow.open(map, marker);
      });
   }

   function codeAddress(appoinmtent) {
      geocoder.geocode({
         'address': appoinmtent.address.full,
      }, function(results, status) {
         var latLng = {
               lat: results[0].geometry.location.lat(),
               lng: results[0].geometry.location.lng()
         };
         if (status == 'OK') {
               map.setCenter(results[0].geometry.location);
               var marker = new google.maps.Marker({
                  position: latLng,
                  map: map
               });
               addInfoWindow(marker,"<a href='/customer/show/"+appoinmtent.customer.id+"'><b>"+appoinmtent.customer.name+"</b></a><br>"+appoinmtent.address.full);
         } else {
               alert('Geocode was not successful for the following reason: ' + status);
         }
      });
   }

   function addMarkers(){
      for(let i = 0; i < appointments.length; i++){
         codeAddress(appointments[i]);
      }
   }

   window.initMap = initMap;
   
</script>
@endsection
