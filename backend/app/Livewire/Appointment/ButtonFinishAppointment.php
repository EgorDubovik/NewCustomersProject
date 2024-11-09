<?php

namespace App\Livewire\Appointment;

use App\Models\Appointment;
use Livewire\Component;
use Illuminate\Support\Facades\Gate;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\On;
class ButtonFinishAppointment extends Component
{

    public $appointment;
    private $remainingBalance = 0;
    private $total = 0;
    private $tax = 0;

    public function activateOrDiactivate(){
        Gate::authorize('update-remove-appointment',['appointment'=>$this->appointment]);

        $status = $this->appointment->status == Appointment::ACTIVE ? Appointment::DONE : Appointment::ACTIVE;
        $this->appointment->update([
            'status' => $status,
        ]);
    }

    public function render()
    {
        $this->setRemainigAndTotalBalance();
        
        return view('livewire.appointment.button-finish-appointment',[
            'appointment' => $this->appointment,
            'remainingBalance' => $this->remainingBalance,
            'total' => $this->total,
        ]);
    }

    /*
    * This function is used to set the total and remaining balance
    * of the appointment
    */
    private function setRemainigAndTotalBalance(){
        $totalAmount = $this->appointment->totalAmount();
        $this->tax = $this->appointment->totalTax();
        $this->total = $totalAmount + $this->tax;
        $this->remainingBalance = $this->appointment->remainingBalance();
        $this->remainingBalance = $this->remainingBalance < 0 ? 0 : $this->remainingBalance;
    }

    #[On('update-total')]
    public function refresh(){
        $this->render();
    }
}
