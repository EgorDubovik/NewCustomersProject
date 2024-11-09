<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'payment_deposit_type',
        'payment_deposit_amount',
        'payment_deposit_amount_prc',
        'tax',
        'referral_active',
    ];
}
