<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @method bool isRole(array $roles)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
        'company_id',
        'active',
        'color',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function company(){
        return $this->belongsTo(Company::class,'company_id');
    }

    public function roles(){
        return $this->hasMany(Role::class);
    }

    public static function employens($company_id){
        $quary = User::where(['company_id'=>$company_id,'active' => 1])->get();
        return $quary;
    }

    public function company_tags(){
        return $this->hasMany(Tag::class,'company_id','company_id');
    }

    public function settings(){
        return $this->hasOne(Settings::class,'company_id','company_id');
    }

    public function phone() : Attribute{
        return Attribute::make(
            get: fn($value) => "+1 ".preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $value),
            set: fn($value) => substr(preg_replace("/[^0-9]/", "", $value),-10)
        );
    }

    public function isRole($roles){
        foreach($roles as $role){
            if($this->roles->contains('role',$role))
                return true;
        }
        return false;
    }

}
