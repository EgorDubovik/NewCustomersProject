<div>
    <div class="btn-group d-flex" role="group" style="    background: #fff; padding: 10px; border-radius: 10px;">
        @if ($appointment->status == App\Models\Appointment::ACTIVE)
            <button class="btn btn-outline-success col-5" type="button" wire:click="activateOrDiactivate">
                <i class="fa fa-check"></i> Finish appointment
            </button>
        @else
            <button class="btn  btn-default col-5" type="button" wire:click="activateOrDiactivate">
                <i class="fa fa-angle-double-left"></i> Back to Active
            </button>
        @endif

        <button href="#" class="btn btn-outline-success col-5">
            <i class="fe fe-copy"></i> Create copy
        </button>
        <button type="button" data-bs-toggle="modal" data-bs-target="#payment_model" class="btn btn-outline-secondary col-2">
            <i class="fa fa-credit-card"></i> Pay
        </button>
    </div>


    @include('livewire.layout.payment-modal')
</div>
