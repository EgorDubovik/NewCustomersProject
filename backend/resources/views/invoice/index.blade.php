@extends('layout.main')

@section('content')

    <div class="main-container container-fluid">
        <!-- PAGE-HEADER -->
        <div class="page-header">
            <h1 class="page-title">Invoices</h1>

        </div>
        <!-- PAGE-HEADER END -->
        <!-- CONTENT -->
        <div class="row">
            <div class="col-md-8">
                @include('layout/success-message',['status' => 'successful'])
                <div class="card">
                    
                    <div class="card-body">
                        <div class="table-responsive push">
                            <table class="table table-bordered table-hover mb-0 text-nowrap">
                                <tbody>
                                <tr>
                                    <th class="text-center">Id</th>
                                    <th>Customer</th>
                                    <th>Email</th>
                                    <th>Created at</th>
                                    <th class="text-end" style="width: 100px">Actions</th>
                                </tr>
                                
                                
                                    @foreach ($invoices as $invoice)
                                        @can('can-view-invoice',['invoice'=>$invoice])
                                        <tr>
                                            <td>{{ $invoice->id }}</td>
                                            <td>
                                                {{ $invoice->customer_name }}
                                                <address class="text-muted">
                                                    {{ str_replace("<br>" ,"",$invoice->address) }}<br>
                                                    {{ $invoice->email }}
                                                </address>
                                            </td>
                                            <td>{{ $invoice->email }}</td>
                                            <td>{{ \Carbon\Carbon::parse($invoice->created_at)->diffForHumans() }}</td>
                                            <td>
                                                <a href="{{ route('invoice.show',['invoice' => $invoice->id]) }}" class="btn btn-info btn-sm"><i class="fe fe-eye"></i> View</a>
                                                <a target="_blank" href="{{ env('AWS_FILE_ACCESS_URL').'invoices/'.$invoice->pdf_path }}" class="btn btn-info btn-sm"><i class="fe fe-eye"></i> PDF</a>
                                            </td>
                                        </tr>
                                        @endcan
                                    @endforeach
                                </tbody>
                            </table>
                            
                        </div>
                        {{ $invoices->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        function deactivate(f){
            if(confirm('Are you sure?'))
                f.submit();
        }
    </script>
@stop
