<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookAppointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'key',
        'active',
        'working_time',
        'tags', // JSON array of tag ids
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'book_appointment_services')->orderByPivot('id');
    }

    public function getTagsAttribute($value)
    {
        return json_decode($value);
    }
}
