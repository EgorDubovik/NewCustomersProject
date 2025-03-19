<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class DailyPaymentsSum extends Model
{
    use HasFactory;

    protected $table = 'daily_payments_sum';
    protected $fillable = [
        'date',
        'company_id',
        'user_id',
        'total',
    ];

    public function total(): Attribute
    {
        return Attribute::make(
            get: fn($value) => round($value / 100, 2),
            set: fn($value) => round($value * 100),
        );
    }
}
