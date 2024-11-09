<?php

namespace App\Models\CompanySettings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyTag extends Model
{
    use HasFactory;

    protected $table = 'company_tags';
    // color - [primary, secondary, success, danger, warning, info, light, dark]
    protected $fillable = ['title', 'color', 'company_id'];

}
