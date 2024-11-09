<?php

namespace App\Livewire\Appointment;

use App\Models\AppointmentService;
use Illuminate\Support\Facades\Auth;
use Livewire\Component;

class ServicesOnCreate extends Component
{

    public $formTitle = 'Add new service';
    public $mode = 'save';

    public $services = [];
    public $tax = 0;
    public $total = 0;

    public $title;
    public $price;
    public $description;
    public $isTaxable = true;

    public $editableSerbiveId = null;

    public $isViewTaxable = true;

    public function render()
    {
        $this->setTotalAndTax();
        return view('livewire.appointment.services-on-create');
    }

    public function store(){
        
        if($this->title == null || $this->price == null)
            return false;

        $this->services[] = [
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
            'taxable' => $this->isTaxable ?: false,
            'id' => count($this->services),
        ];
        
        $this->dispatch('close-modal');
        
    }

    public function setTotalAndTax(){
        $taxVal = Auth::user()->settings->tax;
        $this->tax = 0;
        $this->total = 0;
        foreach($this->services as $key => $service){
            $this->total += $service['price'];
            if($service['taxable'])
                $this->tax += $service['price'] * ($taxVal/100);
        }
        $this->total += $this->tax;
    }

    public function create(){
        $this->formTitle = 'Add new service';
        $this->mode = 'save';
        $this->reset(['title','price','description','isTaxable']);
    }

    public function edit($id){
        $this->formTitle = 'Edit service';
        $this->mode = 'edit';
        $this->title = $this->services[$id]['title'];
        $this->price = $this->services[$id]['price'];
        $this->description = $this->services[$id]['description'];
        $this->isTaxable = $this->services[$id]['taxable'];
        $this->editableSerbiveId = $id;
    }

    public function update(){
        if($this->editableSerbiveId === null)
            return false;

        $this->services[$this->editableSerbiveId]['title'] = $this->title;
        $this->services[$this->editableSerbiveId]['price'] = $this->price;
        $this->services[$this->editableSerbiveId]['description'] = $this->description;
        $this->services[$this->editableSerbiveId]['taxable'] = $this->isTaxable;

        $this->dispatch('close-modal');
    }

    public function delete($id){
        unset($this->services[$id]);
    }
}
