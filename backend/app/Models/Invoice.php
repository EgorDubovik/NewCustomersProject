<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Job\Job;

class Invoice extends Model
{
    use HasFactory;

    protected $table = 'invoices';
    protected $fillable = [
        'creator_id',
        'company_id',
        'customer_id',
        'job_id',
        'customer_name',
        'address',
        'email',
        'status',
        'pdf_path',
        'key',
    ];

    protected $appends = ['pdf_url'];

    public function getPdfUrlAttribute(){
        return $this->pdf_path ? env('AWS_FILE_ACCESS_URL').'invoices/'.$this->pdf_path : null;
    }

    function job(){
        return $this->belongsTo(Job::class);
    }

    function customer(){
        return $this->belongsTo(Customer::class);
    }

    function company(){
        return $this->belongsTo(Company::class);
    }

    public function creator(){
        return $this->belongsTo(User::class, 'creator_id');
    }
}
