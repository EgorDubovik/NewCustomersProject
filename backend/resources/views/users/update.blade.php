@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Update user</h1>
            <div>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0)">Apps</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Update user</li>
                </ol>
            </div>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="col-12">
                <div class="col-xl-6 m-auto">
                    <div class="card">
                        <div class="card-header">
                            <h4>Update user</h4>
                        </div>
                        <div class="card-body">
                            @if($errors->any())
                                @include("layout/error-message")
                            @endif
                            <form method="post">
                                @csrf
                                <div class="row mb-4">
                                    <label for="inputName" class="col-md-3 form-label">User Name</label>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" id="inputName" placeholder="Name" name="user_name" value="{{$user->name}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label for="inputEmail3" class="col-md-3 form-label">Email</label>
                                    <div class="col-md-9">
                                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email" value="{{$user->email}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label for="inputEmail4" class="col-md-3 form-label">Phone</label>
                                    <div class="col-md-9">
                                        <input type="phone" class="form-control" id="inputEmail4" placeholder="Phone" name="phone" value="{{$user->phone}}">
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <label for="inputColor" class="col-md-3 form-label">Color</label>
                                    <div class="col-md-9">
                                        <div class="clr-field" style="color: {{ $user->color }}">
                                            <button type="button" aria-labelledby="clr-open-label" style="width: 100%;height: 100%;border-radius: 5px;"></button>
                                            <input type="text" name="user_color" class="coloris instance3" id="user_color" value="{{ $user->color }}">
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="mb-4 row">
                                    <div class="col-md-3"><b>Role</b></div>
                                    <div class="col-md-9">
                                        <div class="row">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" name="role[]" value="1" {{(in_array(\App\Models\Role::ADMIN,$role_array)) ? "checked" : ""}}>
                                                <span class="custom-control-label">Admin</span>
                                            </label>
                                            <footer class="blockquote-footer">Дает полное право на управление всем</footer>
                                        </div>
                                        <div class="row">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" name="role[]" value="2" {{(in_array(\App\Models\Role::TECH,$role_array)) ? "checked" : ""}}>
                                                <span class="custom-control-label">Technician</span>
                                            </label>
                                            <footer class="blockquote-footer"></footer>
                                            
                                        </div>
                                        <div class="row">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" name="role[]" value="3" {{(in_array(\App\Models\Role::DISP,$role_array)) ? "checked" : ""}}>
                                                <span class="custom-control-label">Dispatcher</span>
                                            </label>
                                            
                                        </div>
                                       
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-warning btn-block">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
@section('scripts')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css"/>
    <script src="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js"></script>
    <script>
        

    /** Default configuration **/

    Coloris({
      el: '.coloris',
      swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#d62828',
        '#023e8a',
        '#0077b6',
        '#0096c7',
        '#00b4d8',
        '#48cae4'
      ]
    });

    

    Coloris.setInstance('.instance3', {
      theme: 'polaroid',
      alpha: false,
      defaultColor: '{{ $user->color }}',
    });

    
    </script>
@endsection
