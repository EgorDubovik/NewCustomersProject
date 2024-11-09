@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header" style="margin-top: 10px; margin-bottom: 10px;">
            <h1 class="page-title">Dashboard</h1>
        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-xl-6">
                        <div class="card overflow-hidden">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="mt-2">
                                        <h6 class="">Total this month</h6>
                                        <h2 class="mb-0 number-font">${{ $sumCurentMonth }}</h2>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="chart-wrapper mt-1">
                                            <canvas id="costchart"
                                                class="h-8 w-9 chart-dropshadow"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card overflow-hidden">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="mt-2">
                                        <h6 class="">Total for today</h6>
                                        <h2 class="mb-0 number-font">${{ $sumCurentDay }}</h2>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="chart-wrapper mt-1">
                                            <canvas id="profitchart"
                                                class="h-8 w-9 chart-dropshadow"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-xl-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-widget">
                                    <!-- <h6 class="mb-2">Total Profit</h6> -->
                                    <h2 class="text-end"><i class="icon-size mdi mdi-currency-usd float-start text-primary text-primary-shadow border-solid border-primary brround p-3"></i><span>${{ $avarageLast30Days }}</span></h2>
                                    <p class="mb-0 pt-5"><span class="float-end"> Avarage day check for last 30 days</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- <div class="col-xl-6">
                        <div class="card overflow-hidden">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="mt-2">
                                        <h6 class="">Total for today</h6>
                                        <h2 class="mb-0 number-font">${{ $sumCurentDay }}</h2>
                                    </div>
                                    <div class="ms-auto">
                                        <div class="chart-wrapper mt-1">
                                            <canvas id="profitchart"
                                                class="h-8 w-9 chart-dropshadow"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> --}}
                </div>

                <div class="row">
                    <div class="col-xl-6">
                        <div class="card">
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-img-absolute circle-icon bg-primary text-center align-self-center box-primary-shadow bradius">
                                        <img src="../assets/images/svgs/circle.svg" alt="img" class="card-img-absolute">
                                        <i class="lnr lnr-user fs-30  text-white mt-4"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="card-body p-4">
                                        <h2 class="mb-2 fw-normal mt-2">{{ $customers_count }}</h2>
                                        <h5 class="fw-normal mb-0">Total Customers</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card">
                            <div class="row">
                                <div class="col-4">
                                    <div class="card-img-absolute circle-icon bg-secondary align-items-center text-center box-secondary-shadow bradius">
                                        <img src="../assets/images/svgs/circle.svg" alt="img" class="card-img-absolute">
                                        <i class="lnr lnr-briefcase fs-30 text-white mt-4"></i>
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div class="card-body p-4">
                                        <h2 class="mb-2 fw-normal mt-2">{{ count($appointments) }}</h2>
                                        <h5 class="fw-normal mb-0">Total Appointments</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-header">
                        Open appointments ({{ count($appointments->where('status',0)) }})
                    </div>
                    <div class="card-body">
                        @forelse ($appointments->where('status',0)->slice(0, 5) as $open_appointment)                
                            @if ($loop->last && count($appointments->where('status',0))>5)
                                <div class="open-appointment-more">
                                    <a href="{{ route('appointment.index') }}"> View all ({{ count($appointments->where('status',0)) }})</a>
                                </div>
                            @else
                                @include('schedule.inludes.open-appointments',['appointment' => $open_appointment])
                            @endif
                        @empty
                            <div class="empty_open_appointments">You don`t have any open appointments</div>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop
@section('scripts')
    <script src="{{ URL::asset('assets/plugins/chart/Chart.bundle.js')}}"></script>
    <script>
        
        var ctx = document.getElementById('profitchart').getContext('2d');
        ctx.height = 10;
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Total Sales',
                    barGap: 0,
                    barSizeRatio: 1,
                    data: [14, 17, 12, 13, 11, 15, 16],
                    backgroundColor: '#4ecc48',
                    borderColor: '#4ecc48',
                    pointBackgroundColor: '#fff',
                    pointHoverBackgroundColor: '#4ecc48',
                    pointBorderColor: '#4ecc48',
                    pointHoverBorderColor: '#4ecc48',
                    pointBorderWidth: 2,
                    pointRadius: 2,
                    pointHoverRadius: 2,
                    borderWidth: 1
                }, ]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                responsive: true,
                tooltips: {
                    enabled: false,
                },
                scales: {
                    xAxes: [{
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        barDatasetSpacing: 0,
                        display: false,
                        barThickness: 5,
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent'
                        }
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                        }
                    }]
                },
                title: {
                    display: false,
                },
            }
        });

        var ctx = document.getElementById('costchart').getContext('2d');
        ctx.height = 10;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Date 1', 'Date 2', 'Date 3', 'Date 4', 'Date 5', 'Date 6', 'Date 7', 'Date 8', 'Date 9', 'Date 10', 'Date 11', 'Date 12', 'Date 13', 'Date 14', 'Date 15', 'Date 16', 'Date 17'],
                datasets: [{
                    label: 'Total Sales',
                    data: [28, 56, 36, 32, 48, 54, 37, 58, 66, 53, 21, 24, 14, 45, 0, 32, 67, 49, 52, 55, 46, 54, 130],
                    backgroundColor: 'transparent',
                    borderColor: '#f7ba48',
                    borderWidth: '2.5',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                }, ]
            },
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                responsive: true,
                tooltips: {
                    enabled: false,
                },
                scales: {
                    xAxes: [{
                        categoryPercentage: 1.0,
                        barPercentage: 1.0,
                        barDatasetSpacing: 0,
                        display: false,
                        barThickness: 5,
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent'
                        }
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                        }
                    }]
                },
                title: {
                    display: false,
                },
            }
        });
    </script>
@endsection
