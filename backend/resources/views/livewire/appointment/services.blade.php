<div class="card">
    <div class="card-header">
        <h3 class="card-title"><i class="fe fe-list"></i> Infromation </h3>
    </div>
    <div class="card-body">
        
        <div class="appointment-time-info d-flex">
            <div>
                <b>Appointment time:</b> <span
                class="text-muted fs-14 mx-2 fw-normal">
                {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->start)->format('M d Y') }}</span>
                {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->start)->format('H:i') }} -
                {{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $appointment->end)->format('H:i') }}
            </div>
            <div class="ms-auto d-flex">
                <a href="{{ route('appointment.edit', ['appointment' => $appointment]) }}" class="text-muted me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="" aria-label="Edit appointment time" data-bs-original-title="Edit appointment time"><span class="fe fe-edit"></span></a>
            </div>
        </div>
        
        @include('livewire.appointment.services-list', ['services' => $appointment->services])
    </div>
    <div class="card-footer">
        <div>Payment history:
            @if ($remainingBalance <= 0)
                <span class="tag tag-outline-success" id="total_on_span" style="margin-left: 30px;">Paid full </span>    
            @else
                <span class="tag tag-outline-danger" id="total_on_span" style="margin-left: 30px;">Total due: ${{ $remainingBalance }}</span>
            @endif
        </div>
        <table style="width: 50%;" align="right" class="table-payment-history">
            @foreach ($appointment->payments as $payment)
            <tr>
                <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('M d Y') }}</td>
                <td>{{ Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $payment->created_at)->format('g:i A') }}</td>
                <td>{{ App\Models\Payment::getPaymentTypeText($payment->payment_type) }}</td>
                <td>${{ number_format($payment->amount,2) }}</td>
            </tr>
            @endforeach
        </table>
    </div>
    <div class="card-footer text-end">
        <button type="button" class="btn btn-sm btn-outline-default float-right" data-bs-toggle="modal" data-bs-target="#create-refund">Issue refund</button>        
    </div>
    @include('livewire.layout.service-add-modal')
    
    <div class="modal fade" id="create-refund" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content modal-content-demo">
                <div class="modal-header">
                    <h6 class="modal-title">Issue Refund</h6>
                    <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"><span aria-hidden="true">×</span></button>
                </div>
                <form method="post" action="{{ route('appointment.refund', ['appointment' => $appointment]) }}">
                    @csrf
                    
                    <div class="modal-body">
                        <div class="amount-pay">
                            <span>$</span><input id="amountPayment" type="text" name="amount" value="{{ $totalPaid }}">
                        </div>
                        <div class="type-of-payment">
                            Type of payment:
                            <div class="btn_cont_type">
                                <input type="hidden" name="payment_type" value="{{ \App\Models\Payment::CREDIT }}">
                                <div class="btn-group d-flex">
                                    <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CREDIT }}" class="btn btn-outline-primary w-100 active">Credit</button>
                                    <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::TRANSFER }}" class="btn btn-outline-primary w-100">Transfer</button>
                                    <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CASH }}" class="btn btn-outline-primary w-100">Cash</button>
                                    <button type="button" onClick="setPaymentType(this)" data-type="{{ \App\Models\Payment::CHECK }}" class="btn btn-outline-primary w-100">Check</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" type="submit">Refund</button> <button class="btn btn-light" data-bs-dismiss="modal" onclick="return false;">Close</button>
                    </div>
                </form>
            </div>
        </div>
     </div>

</div>