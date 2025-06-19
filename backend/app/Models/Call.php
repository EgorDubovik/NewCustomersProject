<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Call extends Model
{
	use HasFactory;
	protected $table = 'calls_logs';
	protected $fillable = [
		'id',
		'from_number',
		'to_number',
		'direction',
		'status',
		'answered_at',
		'completed_at',
		'voicemail_url',
		'voicemail_duration',
		'recording_url',
		'conversation_id',
		'user_id',
		'phone_number_id',
		'company_id',
		'duration_seconds',
		'customer_id',
	];

	public function fromNumber(): Attribute
	{
		return Attribute::make(
			get: fn($value) => "+1 " . preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $value),
			set: fn($value) => substr(preg_replace("/[^0-9]/", "", $value), -10)
		);
	}

	public function toNumber(): Attribute
	{
		return Attribute::make(
			get: fn($value) => "+1 " . preg_replace('~.*(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4}).*~', '($1) $2-$3', $value),
			set: fn($value) => substr(preg_replace("/[^0-9]/", "", $value), -10)
		);
	}

	public function company()
	{
		return $this->belongsTo(Company::class);
	}

	public function customer()
	{
		return $this->belongsTo(Customer::class);
	}
}
