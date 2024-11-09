@extends('layout.main')

@section('content')
<div class="main-container container-fluid">

    <!-- PAGE-HEADER -->
    <div class="page-header">
        <h1 class="page-title">Edit Profile</h1>
        <div>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:void(0)">Pages</a></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Profile</li>
            </ol>
        </div>
    </div>
    <!-- PAGE-HEADER END -->

    <!-- ROW-1 OPEN -->
    <div class="row">
        @if($errors->any())
            @include("layout/error-message")
        @endif
        @include('layout/success-message',['status' => 'success'])
        <div class="col-xl-4">
            <div class="card panel-theme">
                <div class="card-header">
                    <h3 class="card-title">Company logo</h3>
                </div>
                <div class="card-body">
                    @can('edit-company',['company'=>Auth::user()->company])
                    <form method="post" action="{{ route('company.upload.logo') }}" enctype="multipart/form-data">
                        <div class="input-group mb-3">
                            @csrf
                            <input class="form-control form-control-sm" name="logo" type="file">
                            <div class="input-group-append">
                                <button class="btn btn-primary btn-sm" type="submit">Upload</button>
                            </div>
                        </div>
                    </form>
                    @endcan
                    <div class="text-center chat-image mb-5 pt-5">
                        @if (Auth::user()->company->logo)
                            <img src="{{ env('AWS_FILE_ACCESS_URL').Auth::user()->company->logo }}" width="200" />    
                        @else
                            <img src="{{ asset('assets/images/users/21.jpg') }}" width="200" class="brround"/>
                        @endif
                    </div>
                </div>
            </div>

            <div class="card panel-theme">
                <div class="card-header">
                    <h3 class="card-title">Company information</h3>
                    <div class="card-options">
                        @can('edit-company',['company'=>Auth::user()->company])
                        <a href="{{route('company.edit',[Auth::user()->company])}}">
                            <i class="fe fe-edit text-success"></i>
                        </a>
                        @endcan
                    </div>
                </div>
                <div class="card-body no-padding">
                    <ul class="list-group list-group-flush no-margin">
                        <li class="list-group-item d-flex ps-3">
                            <div class="social social-profile-buttons me-2">
                                <a class="social-icon text-primary" href="javascript:void(0)"><i class="fe fe-monitor"></i></a>
                            </div>
                            <span class="my-auto">{{Auth::user()->company->name}}</span>
                        </li>

                        <li class="list-group-item d-flex ps-3">
                            <div class="social social-profile-buttons me-2">
                                <a class="social-icon text-primary" href="javascript:void(0)"><i class="fe fe-mail"></i></a>
                            </div>
                            <span class="my-auto">{!! Auth::user()->company->email ? Auth::user()->company->email : ((Gate::check('edit-company',['company'=>Auth::user()->company])) ? "<a href='".route('company.edit')."' class='text-muted fs-14' style='margin-left:20px;'>edit</a>" : "") !!}</span>
                        </li>
                        <li class="list-group-item d-flex ps-3">
                            <div class="social social-profile-buttons me-2">
                                <a class="social-icon text-primary" href="javascript:void(0)"><i class="fe fe-phone"></i></a>
                            </div>
                            <span class="my-auto">{!! Auth::user()->company->phone ? Auth::user()->company->phone : ((Gate::check('edit-company',['company'=>Auth::user()->company])) ? "<a href='".route('company.edit')."' class='text-muted fs-14' style='margin-left:20px;'>edit</a>" : "") !!}</span>
                        </li>
                        <li class="list-group-item d-flex ps-3">
                            <div class="social social-profile-buttons me-2">
                                <a class="social-icon text-primary" href="javascript:void(0)"><i class="fe fe-map"></i></a>
                            </div>
                            @if (Auth::user()->company->address)
                                <span class="my-auto">{{Auth::user()->company->address->full}}</span>
                            @endif
                        </li>
                    </ul>
                </div>
            </div>
            

        </div>
        <div class="col-xl-8">
            <div class="card">
                <form method="post" action="/profile/edit">
                    @csrf
                <div class="card-header">
                    <h3 class="card-title">Edit Profile</h3>
                </div>
                <div class="card-body">
                    @include('layout.success-message',['status'=>'successful_edit'])
                    @include('layout.modify-errors',['status'=>'error_edit'])
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="form-group">
                                <label for="exampleInputname">User name</label>
                                <input type="text" class="form-control" id="exampleInputname" placeholder="User name" name="user_name" value="{{Auth::user()->name}}">
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="form-group">
                                <label for="exampleInputname1">Phone number</label>
                                <input type="text" class="form-control" id="exampleInputname1" placeholder="(555) 555-5555" name="phone" value="{{Auth::user()->phone}}">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email address" name="email" value="{{Auth::user()->email}}">
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-success my-1">Update</button>
                </div>
                </form>
            </div>
            <div class="card col-6">
                <form action="/profile/change/password" method="post">
                    @csrf
                <div class="card-header">
                    <div class="card-title">Edit Password</div>
                </div>
                <div class="card-body">
                    @include('layout.success-message',['status'=>'successful_password'])
                    @include('layout.modify-errors',['status'=>'error_password'])
                    <div class="form-group">
                        <label class="form-label">Current Password</label>
                        <div class="wrap-input100 validate-input input-group" id="Password-toggle">
                            <a href="javascript:void(0)" class="input-group-text bg-white text-muted">
                                <i class="zmdi zmdi-eye text-muted" aria-hidden="true"></i>
                            </a>
                            <input class="input100 form-control" type="password" name="old_password" placeholder="Current Password">
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="form-label">New Password</label>
                        <div class="wrap-input100 validate-input input-group" id="Password-toggle1">
                            <a href="javascript:void(0)" class="input-group-text bg-white text-muted">
                                <i class="zmdi zmdi-eye text-muted" aria-hidden="true"></i>
                            </a>
                            <input class="input100 form-control" type="password" name="password" placeholder="New Password">
                        </div>
                        <!-- <input type="password" class="form-control" value="password"> -->
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirm Password</label>
                        <div class="wrap-input100 validate-input input-group" id="Password-toggle2">
                            <a href="javascript:void(0)" class="input-group-text bg-white text-muted">
                                <i class="zmdi zmdi-eye text-muted" aria-hidden="true"></i>
                            </a>
                            <input class="input100 form-control" type="password" name="password2" placeholder="Confirm Password">
                        </div>
                        <!-- <input type="password" class="form-control" value="password"> -->
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
                </form>
            </div>

{{--            <div class="card">--}}
{{--                <div class="card-header">--}}
{{--                    <div class="card-title">Delete Account</div>--}}
{{--                </div>--}}
{{--                <div class="card-body">--}}
{{--                    <p>Its Advisable for you to request your data to be sent to your Email.</p>--}}
{{--                    <label class="custom-control custom-checkbox mb-0">--}}
{{--                        <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1" checked>--}}
{{--                        <span class="custom-control-label">Yes, Send my data to my Email.</span>--}}
{{--                    </label>--}}
{{--                </div>--}}
{{--                <div class="card-footer text-end">--}}
{{--                    <a href="javascript:void(0)" class="btn btn-primary my-1">Deactivate</a>--}}
{{--                    <a href="javascript:void(0)" class="btn btn-danger my-1">Delete Account</a>--}}
{{--                </div>--}}
{{--            </div>--}}
        </div>
    </div>
    <!-- ROW-1 CLOSED -->
</div>

@stop
