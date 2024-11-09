<?php

namespace App\Livewire\Appointment;

use App\Models\AppointmentService;
use Livewire\Component;
use Illuminate\Support\Facades\Gate;

class Services extends Component
{

    public $mode = 'save'; 
    public $formTitle = 'Add new service';
    public $appointment;

    public $title;
    public $price;
    public $description;
    public $isViewTaxable;
    public $isTaxable = false;
    public $editableServiceId = null;

    public $total = 0;
    public $tax = 0;
    public $remainingBalance;
    public $totalPaid = 0;

    public function mount(){
        $this->isTaxable = $this->isTaxableSave();
    }

    public function render()
    {
        $this->setRemainigAndTotalBalance();
        return view('livewire.appointment.services');
    }

    public function store(){
        
        Gate::authorize('add-remove-service-from-appointment',[$this->appointment]);

        if($this->title == null || $this->price == null)
            return false;

        AppointmentService::create([
            'appointment_id' => $this->appointment->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price ?: 0,
            'taxable' => $this->isTaxable ?: false,
        ]);

        $this->dispatch('update-total');
        $this->dispatch('close-modal');
    }

    public function delete(AppointmentService $service){

        Gate::authorize('add-remove-service-from-appointment',[$this->appointment]);
        
        if($service->appointment_id == $this->appointment->id)
            $service->delete();
        
        $this->dispatch('update-total');
    }

    public function edit(AppointmentService $service){

        if($service->appointment_id !== $this->appointment->id)
            return false;

        $this->editableServiceId = $service->id;
        $this->mode = 'edit';
        $this->formTitle = 'Edit service';
        $this->title = $service->title;
        $this->price = $service->price;
        $this->description = $service->description;
        $this->isTaxable = ($service->taxable) ? true : false;

        
    }

    public function update(){

        Gate::authorize('add-remove-service-from-appointment',[$this->appointment]);

        if($this->editableServiceId==null)
            return false;
        
        $appointmentService = AppointmentService::find($this->editableServiceId);
        if(!$appointmentService || $appointmentService->appointment_id != $this->appointment->id)
            return false;

        $appointmentService->update([
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
            'taxable' => $this->isTaxable,
        ]);

        $this->dispatch('update-total');
        $this->dispatch('close-modal');
        
    }

    public function create(){
        $this->mode = 'save';
        $this->formTitle = 'Add new service';

        $this->title = "";
        $this->price = "";
        $this->description = "";
        $this->isTaxable = $this->isTaxableSave();
    }

    private function isTaxableSave(){
        return true;
    }

    /*
    * This function is used to set the total and remaining balance
    */
    private function setRemainigAndTotalBalance(){
        $totalAmount = $this->appointment->totalAmount();
        $this->tax = $this->appointment->totalTax();
        $this->total = $totalAmount + $this->tax;
        $this->remainingBalance = $this->appointment->remainingBalance();
        $this->remainingBalance = $this->remainingBalance < 0 ? 0 : $this->remainingBalance;
    }
    
}
