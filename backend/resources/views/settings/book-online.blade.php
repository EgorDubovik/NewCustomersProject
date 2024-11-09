@extends('layout.main')

@section('content')
    <div class="main-container container-fluid">

        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Settings</h1>
        </div>
        <!-- PAGE-HEADER END -->

        <!-- ROW-1 OPEN -->
        <div class="row">
            
            @include("layout/error-message")
            @include('layout/success-message', ['status' => 'success'])

            <div class="col-md-6 m-auto">
               <div class="card">
                  <div class="card-body">
                     <div class="form-group">
                        {{-- <label class="custom-switch form-switch mb-0" style="cursor: pointer">
                           <input type="checkbox" name="custom-switch-radio" class="custom-switch-input" onclick="toogleActivate(this)">
                           <span class="custom-switch-indicator custom-switch-indicator-lg"></span>
                           <span class="custom-switch-description">Activate booking online</span>
                        </label> --}}
                     </div>
                  
                     @if($bookAppointment)

                        <div class="row mt-3 mb-4">
                           <div class="col-6 " style="text-align: left">
                              <label class="custom-switch form-switch mb-0" style="cursor: pointer">
                                 <input type="checkbox" name="custom-switch-radio" class="custom-switch-input" {{ $bookAppointment->active ? 'checked' : '' }} onclick="toogleActivate(this)">
                                 <span class="custom-switch-indicator custom-switch-indicator-lg"></span>
                                 <span class="custom-switch-description">Activate booking online</span>
                              </label>
                           </div>
                        </div>
                        <div class="link-conteiner {{ $bookAppointment->active ? 'active' : '' }}">
                           <div class="row">
                              <div class="col-10">
                                 <div class="input-group">
                                    <input type="text" class="form-control input-key" placeholder="" value="{{ Request::root().'/appointment/book/'.$bookAppointment->key }}" {{ !$bookAppointment->active ? 'disabled' : '' }} />
                                    <button class="btn btn-light copy-key" type="button" id="button-addon2" {{ !$bookAppointment->active ? 'disabled' : '' }}><i class="fe fe-copy"></i></button>
                                 </div>
                              </div>
                              <div class="col-2">
                                 <a  href="{{  route('settings.book-online.delete') }}" onclick="if(confirm('Are you sure?')) return true; else return false;" data-href="{{ route('settings.book-online.delete') }}" class="btn btn-danger remove-book"><i class="fe fe-trash"></i></a>
                              </div>
                           </div>
                        </div> 


                        <div class="card-title mt-7">
                           Statistics
                        </div>
                        
                        <div class="table-responsive">
                           <table class="table table-bordered text-nowrap border-bottom" id="basic-datatable">
                               <thead>
                                   <tr>
                                       <th class="wd-15p border-bottom-0">id</th>
                                       <th class="wd-15p border-bottom-0">Prev url</th>
                                       <th class="wd-15p border-bottom-0">Device type</th>
                                       <th class="wd-15p border-bottom-0">IP address</th>
                                       <th class="wd-20p border-bottom-0">Created at</th>
                                   </tr>
                               </thead>
                               <tbody>
                                 @foreach ($bookOnlineStats as $bookOnlineStat)
                                   <tr>
                                       <td>{{ $bookOnlineStat->id }}</td>
                                       <td>{{ $bookOnlineStat->prev_url }}</td>
                                       <td>{{ $bookOnlineStat->device_type }}</td>
                                       <td>{{ $bookOnlineStat->ip }}</td>
                                       <td>{{ $bookOnlineStat->created_at }}</td>
                                   </tr>
                                 @endforeach
                               </tbody>
                           </table>
                       </div>
                        


                     @else
                        <div class="link-conteiner active">
                           <a href="{{ route('settings.book-online.create')}}" data-href="{{ route('settings.book-online.create') }}" class="btn btn-primary">Create new link</a>
                        </div>
                     @endif
                     
                     

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
            if(!status){
               $('.link-conteiner').find('input').each(function(){
                  $(this).prop('disabled', true);
               });
               $('.link-conteiner').find('button').each(function(){
                  $(this).prop('disabled', true);
               });
               $('.link-conteiner').find('a').each(function(){
                  $(this).removeAttr('href');
               })
                  
               $('.link-conteiner').removeClass('active');

            } else {
               $('.link-conteiner').find('input').each(function(){
                  $(this).prop('disabled', false);
               });
               $('.link-conteiner').find('button').each(function(){
                  $(this).prop('disabled', false);
               });
               
               $('.link-conteiner').find('a').each(function(){
                  $(this).attr('href',$(this).attr('data-href'));
               })

               $('.link-conteiner').addClass('active');
            }
            $.ajax({
                method:'post',
                url:"{{ route('settings.book-online.activate') }}",
                data:{
                    _token : "{{ csrf_token() }}",
                    status : status,
                },
            }).done(function(data) {
                console.log(data);
            }).fail(function() {
                alert("error");
            });
         }

         $('.input-key').on('focus', function() {
            $(this).select();
         });
         $('.copy-key').click(function(){
            $('.input-key').select();

         })


         $('#basic-datatable').DataTable({
            language: {
                  searchPlaceholder: 'Search...',
                  sSearch: '',
            },
            "bSort": false,
         });
    </script>
@endsection
