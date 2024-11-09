<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerTags extends Model
{
    use HasFactory;
    protected $table = 'customer_tags';
    protected $fillable = [
        'customer_id',
        'tag_id',
    ];

}
