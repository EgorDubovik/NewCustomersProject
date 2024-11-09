<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookOnlineCounterStatistics extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_online_id',
        'prev_url',
        'device_type',
        'ip',
    ];
}
