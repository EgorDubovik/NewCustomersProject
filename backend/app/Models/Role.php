<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'roles';

    public const ADMIN = 1;
    public const TECH = 2;
    public const DISP = 3;

    public const ROLES = ['', 'Admin','Technician', 'Dispatcher'];
    public const ROLES_ID = [1, 2, 3];
    public const TAGS = ['', 'green', 'blue', 'orange'];

    protected $fillable = [
        'user_id',
        'role',
    ];

    protected $hidden = [
        'id',
        'user_id',
    ];
}
