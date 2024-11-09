<?php

namespace App\Models\Job;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notes extends Model
{
    use HasFactory;

    protected $table = 'job_notes';

    protected $fillable = [
        'job_id',
        'creator_id',
        'text',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class,'creator_id','id');
    }


}
