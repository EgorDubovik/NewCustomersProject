@extends('layout.main')

@section('content')
    <div class="main-container container-fluid">

        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Settings Referral</h1>
        </div>
        <!-- PAGE-HEADER END -->

        <!-- ROW-1 OPEN -->
        <div class="row">
            
            @include("layout/error-message")
            @include('layout/success-message', ['status' => 'success'])

            <div class="col-md-6 m-auto">
               <div class="card">
                  <div class="card-body">
                     
                     <div class="row mt-3 mb-4">
                        <div class="col-6 " style="text-align: left">
                           <label class="custom-switch form-switch mb-0" style="cursor: pointer">
                              <input type="checkbox" name="custom-switch-radio" class="custom-switch-input" {{ ($company->companySettings->referral_enable) ? 'checked' : '' }} onclick="toogleActivate(this)">
                              <span class="custom-switch-indicator custom-switch-indicator-lg"></span>
                              <span class="custom-switch-description">Activate referral program</span>
                           </label>
                        </div>
                     </div>
                     <div class="referral_link">
                        <form action="{{ route('settings.referral.savelink') }}" method="POST">
                           @csrf
                           <div class="row">
                              <div class="col-md-2">
                                 <p>Referral link to:</p>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="referral_link" value="{{ $company->companySettings->referral_link ?? ""  }}">
                              </div>
                              <div class="col-md-2">
                                 <button type="submit" class="btn btn-primary">Update</button>
                              </div>
                           </div>
                        </form>
                     </div>
                     <div class="hr mt-6 mb-6"></div>
                     <div class="cont-referral-range">
                        <p>Referral range:</p>
                        <p>
                           <div class="row">
                              <form method="POST" action="{{ route('settings.referral.changerange') }}">
                              @csrf
                              <div class="col-md-6 m-auto">
                                 <div id="referral-items">
                                    @foreach ($referralRange as $range)   
                                       <div class="row">
                                          <div class="col-5">
                                             <div class="input-group input-group-sm mb-3">
                                                <span class="input-group-text referal-range-text">Count:</span>
                                                <input type="text" class="form-control" name="referral_count[]" value="{{ $range->referral_count }}">
                                             </div>
                                          </div>
                                          <div class="col-5">
                                             <div class="input-group input-group-sm mb-3">
                                                <span class="input-group-text referal-range-text">Discount:</span>
                                                <input type="text" class="form-control" name="referral_discount[]" value="{{ $range->discount }}">
                                             </div>
                                          </div>
                                          <div class="col-2">
                                             <a class="btn text-danger btn-sm" onclick="removeLine(this);return false;" ><span class="fe fe-trash-2 fs-14"></span></a>
                                          </div>
                                       </div>
                                    @endforeach
                                 </div>
                                 <div class="row mt-2">
                                    <button class="btn btn-default btn-sm" type="button" id="button-addon2" onclick="addLine();return false"><i class="fe fe-plus"></i> add more</button>
                                    
                                 </div>
                                 <div class="row mt-6">
                                    <button class="btn btn-success btn-sm" type="submit" id="button-addon2"><i class="fe fe-save"></i> Save changes</button>
                                 </div>
                              </div>
                              </form>
                           </div>
                        </p>
                     </div>
                     
                  </div>
               </div>
            </div>
        </div>
    </div>
@stop

@section("scripts")
   <script src="../assets/plugins/datatable/js/jquery.dataTables.min.js"></script>
   <script src="../assets/plugins/datatable/js/dataTables.bootstrap5.js"></script>
   <script src="../assets/plugins/datatable/js/dataTables.buttons.min.js"></script>
   <script>
      function toogleActivate(d){
            let radio = $(d);
            let status = radio.is(':checked');
           
            $.ajax({
                method:'post',
                url:"{{ route('settings.referral.activate') }}",
                data:{
                    _token : "{{ csrf_token() }}",
                    status : status,
                },
            }).done(function(data) {
                console.log(data);
            }).fail(function(error) {
               console.log(error);
            });
      }
      
      function removeLine(d){
         $(d).parent().parent().remove();
      }

      function addLine(){
         $('#referral-items').append('<div class="row">' +
                                       '<div class="col-5">' +
                                          '<div class="input-group input-group-sm mb-3">' +
                                             '<span class="input-group-text referal-range-text">Count:</span>'+
                                             '<input type="text" class="form-control" name="referral_count[]">'+
                                          '</div>'+
                                       '</div>'+
                                       '<div class="col-5">'+
                                          '<div class="input-group input-group-sm mb-3">'+
                                             '<span class="input-group-text referal-range-text">Discount:</span>'+
                                             '<input type="text" class="form-control" name="referral_discount[]">'+
                                          '</div>'+
                                       '</div>'+
                                       '<div class="col-2">'+
                                          '<a class="btn text-danger btn-sm" onclick="removeLine(this);return false;" data-bs-toggle="tooltip" data-bs-original-title="Delete"><span class="fe fe-trash-2 fs-14"></span></a>'+
                                       '</div>'+
                                    '</div>');
      }
   </script>
@endsection
