<?php

namespace App\Models\CompanySettings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EndPointToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'company_id',
    ];
}
