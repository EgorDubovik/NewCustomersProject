<?php

namespace App\Models\Job;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Addresses;
use App\Models\Payment;
use App\Models\Appointment;
use App\Models\CompanySettings\GeneralInfoSettings;
use Illuminate\Support\Facades\Auth;
use App\Models\Job\Image;
use App\Models\Invoice;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'company_id',
        'address_id',
    ];

    protected $appends = ['total_paid','remaining_balance','total_tax','total_amount'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function address()
    {
        return $this->belongsTo(Addresses::class);
    }

    public function notes(){
        return $this->hasMany(Notes::class);
    }

    public function expenses(){
        return $this->hasMany(Expense::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function totalPaid()
    {
        return $this->payments->sum('amount');
    }


    public function getTotalPaidAttribute()
    {
        return $this->totalPaid();
    }

    public function getTotalTaxAttribute()
    {
        return $this->totalTax();
    }

    public function getTotalAmountAttribute()
    {
        return $this->totalAmount();
    }

    public function getRemainingBalanceAttribute()
    {
        return $this->remainingBalance();
    }

    public function totalTax()
    {
        $tax = 0;
        foreach($this->services as $service){
            if($service->taxable)
                $tax += $service->price * GeneralInfoSettings::getSettingByKey(Auth::user()->company_id,'taxRate')/100;
        }
        return $tax;
    }

    public function totalAmount()
    {
        $total = 0;
        foreach($this->services as $service){
            $total += $service->price;
        }
        return $total+$this->totalTax();
    }

    public function remainingBalance()
    {
        $remaining = $this->totalAmount() - $this->totalPaid();
        if($remaining < 0)
            return 0;
        return round($remaining,2);
    }
}
