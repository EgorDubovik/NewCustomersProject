<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentTechs extends Model
{
    use HasFactory;

    protected $tabel = 'appointment_techs';
    protected $fillable = [
        'appointment_id',
        'tech_id',
        'creator_id',
    ];

}
