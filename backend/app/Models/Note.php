<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $table = 'notes';
    protected $fillable = [
        'creator_id',
        'customer_id',
        'text',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class,'creator_id','id');
    }

}
