<?php

namespace App\Livewire\Customer;

use Illuminate\Support\Facades\Auth;
use Livewire\Component;
use App\Models\Customer;

class CreateCustomer extends Component
{
    public $phone;
    public $address;
    public $customers = [];
    

    public function mount()
    {
        $this->phone = old('customer_phone');
    }

    public function render()
    {

        if(strlen($this->phone) > 5 || strlen($this->address) > 5)
            $this->customers = Customer::where('company_id', Auth::user()->company_id)
                ->where(function($query){
                    if(strlen($this->phone) > 5)
                        $query->orWhere('phone','LIKE',"%$this->phone%");
                    if(strlen($this->address) > 5)
                        $query->orWhereHas('address',function($a_query){
                            $a_query->where('line1','LIKE',"%$this->address%");
                        });
                })
                ->get();
        else $this->customers= [];

        return view('livewire.customer.create-customer');
    }
}
