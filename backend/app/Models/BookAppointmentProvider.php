<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookAppointmentProvider extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'key',
    ];

    public function appointment(){
        return $this->belongsTo(Appointment::class);
    }
}
