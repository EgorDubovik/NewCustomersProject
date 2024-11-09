<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'company_id',
        'customer_id',
        'tech_id',
        'rating',
        'feedback',
    ];
}
