<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\Job\Job;

class Appointment extends Model
{
    use HasFactory;

    public const ACTIVE = 0;
    public const DONE = 1;

    protected $fillable = [
        'start',
        'end',
        'company_id',
        'status',
        'job_id',
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function job() {
        return $this->belongsTo(Job::class);
    }

    public function techs()
    {
        return $this->belongsToMany(User::class, AppointmentTechs::class, 'appointment_id','tech_id');
    }

    // public function images()
    // {
    //     return $this->hasMany(AppointmentImage::class);
    // }
    

  
    // public function address() 
    // {
    //     return $this->hasOne(Addresses::class,'id','address_id');
    // }
    
    // public function payments()
    // {
    //     return $this->hasMany(Payment::class);
    // }

    // public function totalPaid()
    // {
    //     return $this->payments->sum('amount');
    // }

    // public function totalTax()
    // {
    //     $tax = 0;
    //     foreach($this->services as $service){
    //         if($service->taxable)
    //             $tax += $service->price * (Auth::user()->settings->tax/100);
    //     }
    //     return $tax;
    // }

    // public function totalAmount()
    // {
    //     $total = 0;
    //     foreach($this->services as $service){
    //         $total += $service->price;
    //     }
    //     return $total;
    // }

    // public function remainingBalance()
    // {
    //     return round($this->totalAmount() + $this->totalTax() - $this->totalPaid(),2);
    // }

    

    // public function images()
    // {
    //     return $this->hasMany(AppointmentImage::class,'appointment_id');
    // }

    // public function expanse()
    // {
    //     return $this->hasMany(Expanse::class);
    // }
}
