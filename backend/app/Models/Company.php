<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CompanySettings\GeneralInfoSettings;

class Company extends Model
{
    use HasFactory;

    protected $table = 'company';
    protected $appends = ['fullAddress'];

    protected $fillable = [
        'name',
        'phone',
        'email',
        'address_id',
        'logo',
    ];

    public function address()
    {
        return $this->hasOne(Addresses::class, 'id', 'address_id');
    }

    public function phone(): Attribute
    {
        return Attribute::make(
            get: fn($value) => "+1 " . preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $value),
            set: fn($value) => substr(preg_replace("/[^0-9]/", "", $value), -10)
        );
    }



    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function companySettings()
    {
        return $this->hasOne(GeneralInfoSettings::class);
    }

    public function bookAppointment()
    {
        return $this->hasOne(BookAppointment::class);
    }

    public function techs()
    {
        return $this->hasMany(User::class);
    }

    public function getFullAddressAttribute()
    {
        return $this->getFullAddress();
    }

    private function getFullAddress()
    {
        if(!$this->address){
            return '';
        }
        return $this->address->line1 . ' ' . $this->address->line2 . ', ' . $this->address->city . ' ' . $this->address->state . ' ' . $this->address->zip;
    }
}
