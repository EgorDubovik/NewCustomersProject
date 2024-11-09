<?php

namespace App\Models;

use App\Models\CompanySettings\CompanyTag;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Job\Job;

class Customer extends Model
{
    use HasFactory;
    protected $table = 'customers';
    protected $fillable = [
        'name',
        'phone',
        'email',
        'company_id',
    ];


    public function phone(): Attribute{
        return Attribute::make(
            get: fn($value) => "+1 ".preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $value),
            set: fn($value) => substr(preg_replace("/[^0-9]/", "", $value),-10)
        );
    }

    public function scopeSearch($query, $searchTerm=''){
        $searchTermWithoutPlusOne  = preg_replace('/^\+1\s*/', '', $searchTerm);
        $numericSearchTerm = preg_replace('/\D/', '', $searchTermWithoutPlusOne);
        return $query->where(function ($query) use ($searchTerm, $numericSearchTerm) {
            $query->where(function ($q) use ($searchTerm) {
               $q->where('name', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('phone', 'LIKE', "%{$searchTerm}%");
            });

            if (!empty($numericSearchTerm) && !preg_match('/[a-zA-Z]/',$searchTerm)) {
               $query->orWhere('phone', 'LIKE', "%{$numericSearchTerm}%");
            }

            $query->orWhereHas('address', function ($a_query) use ($searchTerm) {
               $a_query->where('line1', 'LIKE', "%$searchTerm%");
            });
         });
    }

    public function address(){
        return $this->hasMany(Addresses::class)->orderByDesc('created_at');
    }

    public function tags(){
        return $this->belongsToMany(CompanyTag::class, 'customer_tags', 'customer_id', 'tag_id');
    }

    public function notes(){
        return $this->hasMany(Note::class)->orderByDesc('created_at');
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class)->orderByDesc('created_at');
    }

    public function referralStat()
    {
        return $this->hasMany(ReferalCustomerStat::class,'customer_id','id');
    }

    public function referralCode()
    {
        return $this->hasOne(ReferalLinksCode::class,'customer_id','id');
    }

}
