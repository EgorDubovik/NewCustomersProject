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
}
