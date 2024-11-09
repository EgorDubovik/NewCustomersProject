<!doctype html>
<html lang="en" dir="ltr">

<head>

    <!-- META DATA -->
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Sash – Bootstrap 5  Admin & Dashboard Template">
    <meta name="author" content="Spruko Technologies Private Limited">
    <meta name="keywords"
          content="admin,admin dashboard,admin panel,admin template,bootstrap,clean,dashboard,flat,jquery,modern,responsive,premium admin templates,responsive admin,ui,ui kit.">

    <!-- FAVICON -->
    <link rel="shortcut icon" type="image/x-icon" href="{{ URL::asset('assets/images/brand/favicon.ico')}}" />

    <!-- TITLE -->
    <title>Sash – Bootstrap 5 Admin & Dashboard Template </title>

    <!-- BOOTSTRAP CSS -->
    <link id="style" href="{{ URL::asset('assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />

    <!-- STYLE CSS -->
    <link href="{{ URL::asset('assets/css/style.css')}}" rel="stylesheet" />
    <link href="{{ URL::asset('assets/css/dark-style.css')}}" rel="stylesheet" />
    <link href="{{ URL::asset('assets/css/transparent-style.css')}}" rel="stylesheet">
    <link href="{{ URL::asset('assets/css/skin-modes.css')}}" rel="stylesheet" />
    <link href="{{ URL::asset('assets/css/mystyle.css')}}" rel="stylesheet" />
    <link href="{{ URL::asset('assets/css/jquery.signaturepad.css')}}" rel="stylesheet" />
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

    <!--- FONT-ICONS CSS -->
    <link href="{{ URL::asset('assets/css/icons.css')}}" rel="stylesheet" />

    <!-- COLOR SKIN CSS -->
    <link id="theme" rel="stylesheet" type="text/css" media="all" href="{{ URL::asset('assets/colors/color1.css')}}" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
    @yield('css')
</head>

<body class="app sidebar-mini ltr light-mode">

<!-- GLOBAL-LOADER -->
@include("layout/loader")
<!-- /GLOBAL-LOADER -->

<!-- PAGE -->
<div class="page">
    <div class="page-main">

        <!-- app-Header -->
        @include("layout/nav/top")
        <!-- /app-Header -->

        <!--APP-SIDEBAR-->
        @include("layout/nav/left-menu")
        <!--/APP-SIDEBAR-->

        <!--app-content open-->
        <div class="main-content app-content mt-0">
            <div class="side-app">

                <!-- CONTAINER -->
                @yield('content')
                <!-- CONTAINER END -->

            </div>
        </div>
        <!--app-content close-->

    </div>

    <!-- FOOTER -->
    @include("layout/nav/footer")
    <!-- FOOTER END -->

</div>

<!-- BACK-TO-TOP -->
<a href="#top" id="back-to-top"><i class="fa fa-angle-up"></i></a>

<!-- JQUERY JS -->
<script src="{{ URL::asset('assets/js/jquery.min.js')}}"></script>
{{--<script src="https://code.jquery.com/jquery-1.12.4.js"></script>--}}

<!-- BOOTSTRAP JS -->
<script src="{{ URL::asset('assets/plugins/bootstrap/js/popper.min.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>

<!-- SPARKLINE JS-->
<script src="{{ URL::asset('assets/js/jquery.sparkline.min.js')}}"></script>

<!-- Sticky js -->
<script src="{{ URL::asset('assets/js/sticky.js')}}"></script>

<!-- CHART-CIRCLE JS-->
<script src="{{ URL::asset('assets/js/circle-progress.min.js')}}"></script>

<!-- PIETY CHART JS-->
<script src="{{ URL::asset('assets/plugins/peitychart/jquery.peity.min.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/peitychart/peitychart.init.js')}}"></script>

<!-- SIDEBAR JS -->
<script src="{{ URL::asset('assets/plugins/sidebar/sidebar.js')}}"></script>
<!-- INTERNAL SELECT2 JS -->
<script src="{{ URL::asset('assets/plugins/select2/select2.full.min.js')}}"></script>

<!-- INTERNAL Data tables js-->
<script src="{{ URL::asset('assets/plugins/datatable/js/jquery.dataTables.min.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/datatable/js/dataTables.bootstrap5.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/datatable/dataTables.responsive.min.js')}}"></script>

<!-- INTERNAL APEXCHART JS -->
<script src="{{ URL::asset('assets/js/apexcharts.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/apexchart/irregular-data-series.js')}}"></script>

<!-- INTERNAL Flot JS -->
<script src="{{ URL::asset('assets/plugins/flot/jquery.flot.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/flot/jquery.flot.fillbetween.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/flot/chart.flot.sampledata.js')}}"></script>
<script src="{{ URL::asset('assets/plugins/flot/dashboard.sampledata.js')}}"></script>

<!-- SIDE-MENU JS-->
<script src="{{ URL::asset('assets/plugins/sidemenu/sidemenu.js')}}"></script>

<script src="{{ URL::asset('assets/plugins/notify/js/notifIt.js') }}"></script>

<!-- TypeHead js -->
{{--<script src="{{ URL::asset('assets/plugins/bootstrap5-typehead/autocomplete.js')}}"></script>--}}
{{--<script src="{{ URL::asset('assets/js/typehead.js')}}"></script>--}}

<!-- INTERNAL INDEX JS -->
{{-- <script src="{{ URL::asset('assets/js/index1.js')}}"></script> --}}

<!-- Color Theme js -->
<script src="{{ URL::asset('assets/js/themeColors.js')}}"></script>

<!-- CUSTOM JS -->
<script src="{{ URL::asset('assets/js/custom.js')}}"></script>

<!-- additional script-->
@yield('scripts')
<!-- additional script END -->

</body>

</html>
