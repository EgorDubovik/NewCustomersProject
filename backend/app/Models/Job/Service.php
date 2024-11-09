<?php

namespace App\Models\Job;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Service extends Model
{
    use HasFactory;

    protected $table = 'job_services';
    protected $fillable = [
        'title',
        'price',
        'taxable',
        'description',
        'job_id',
    ];

    public function job() {
        return $this->belongsTo(Job::class);
    }

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value/100,2,'.',''),
            set: fn($value) => round($value*100),
        );
    }
}
