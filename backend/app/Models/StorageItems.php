<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorageItems extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'quantity',
        'expexted_quantity',
        'company_id',
        'user_id'
        
    ];

    public function company(){
        return $this->belongsTo(Company::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
