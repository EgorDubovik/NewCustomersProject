<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Job\Job;
class Payment extends Model
{
    use HasFactory;

    public const CREDIT = 1;
    public const CASH = 2;
    public const CHECK = 3;
    public const TRANSFER = 4;
    public const TYPE = ['credit','cash','check','transfer'];

    protected $appends = ['type_text'];
    protected $table = 'payments';
    protected $fillable = [
        'job_id',
        'amount',
        'payment_type',
        'company_id',
        'tech_id',
    ];

    public function amount(): Attribute
    {
        return Attribute::make(
            get: fn($value) => round($value/100,2),
            set: fn($value) => round($value*100),
        );
    }

    public static function getPaymentTypeText($type){
        $text = ['undefined','Credit', 'Cash', 'Check','Transfer'];
        $index = (($type > 0) && ($type < count($text))) ? $type : 0; 
        return $text[$index];
    }

    public function job() {
        return $this->belongsTo(Job::class);
    }

    public function tech() {
        return $this->belongsTo(User::class,'id','tech_id');
    }

    public function getTypeTextAttribute(){
        return self::getPaymentTypeText($this->payment_type);
    }
    
    
}
