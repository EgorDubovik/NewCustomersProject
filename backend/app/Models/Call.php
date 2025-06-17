<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Call extends Model
{
    use HasFactory;
    protected $table = 'calls_logs';
    protected $fillable = [
        'id',
        'from_number',
        'to_number',
        'direction',
        'status',
        'answered_at',
        'completed_at',
        'voicemail_url',
        'voicemail_duration',
        'recording_url',
        'conversation_id',
        'user_id',
        'phone_number_id',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }



}
