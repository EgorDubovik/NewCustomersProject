<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferalLinksCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'customer_id',
        'company_id',
    ];
}
