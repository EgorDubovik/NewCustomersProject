<?php

namespace App\Livewire;

use App\Models\Service;
use Livewire\Component;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class Services extends Component
{
    public $services;
    public $mode = 'save';
    public $formTitle = 'Add new service';

    public Service $service;
    public $title;
    public $price;
    public $description;

    public function render()
    {
        $this->services = Service::where('company_id',Auth::user()->company_id)->get();
        return view('livewire.services');
    }
    
    public function create(){
        $this->reset();
    }

    public function store(){

        Gate::authorize('create-service');

        $service = Service::create([
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
            'company_id' => Auth::user()->company_id,
        ]);
        $this->services->add($service);

        $this->dispatch('close-modal');
    }

    public function update(){

        Gate::authorize('update-service',['service'=>$this->service]);

        $this->service->update([
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
        ]);

        $this->reset();
        $this->dispatch('close-modal');
    }

    public function edit(Service $service){

        $this->mode = 'edit';
        $this->formTitle = 'Edit service';

        $this->service = $service;
        $this->title = $service->title;
        $this->price = $service->price;
        $this->description = $service->description;
    }

    public function delete(Service $service){
        if($service->company_id == Auth::user()->company_id)
            $service->delete();
    }
}
