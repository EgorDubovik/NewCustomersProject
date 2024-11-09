<?php

namespace App\Livewire;

use App\Models\Customer;
use Livewire\Component;
use Livewire\WithPagination;
use Illuminate\Support\Facades\Auth;

class CustomersList extends Component
{

    public $search = "";
    public $customers;
    
    public function render()
    {
        $this->customers = Customer::where('company_id',Auth::user()->company_id)
            ->search($this->search)
            ->orderByDesc('updated_at')
            ->limit(50)
            ->get();
        
        return view('livewire.customers-list');
    }
}
