<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $table = 'images';
    protected $fillable = [
        'customer_id',
        'path',
        'owner_id',
    ];
    protected $appends = [
        'file_name',
    ];

    public function getFileNameAttribute(){
        return basename($this->path);
    }

    public function owner(){
        return $this->hasOne(User::class,'id','owner_id');
    }
}
