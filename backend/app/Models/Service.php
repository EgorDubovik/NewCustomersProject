<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = 'services';
    protected $fillable = [
        'title',
        'description',
        'price',
        'company_id',
    ];

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => round($value/100,2),
            set: fn($value) => round($value*100),
        );
    }
}
