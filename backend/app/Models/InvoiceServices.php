<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceServices extends Model
{
    use HasFactory;

    public static $_TAX = 8.25;
    protected $table = 'invoice_services';

    protected $fillable = [
        'invoice_id',
        'title',
        'description',
        'price',
        'is_taxeble',
    ];

    public function price(): Attribute
    {
        return Attribute::make(
            get: fn($value) => number_format($value/100,2,'.'),
            set: fn($value) => round($value*100,2),
        );
    }
}
