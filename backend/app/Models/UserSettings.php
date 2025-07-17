<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
	use HasFactory;

	protected $table = 'user_settings';

	public static $DEFAULT_SETTINGS = [
		'timePickerLineLength' => 3,
	];

	protected $fillable = [
		'user_id',
		'key',
		'value',
	];

	public static function getAllSettingsForUser($userId)
	{
		$settings = self::where('user_id', $userId)
			->pluck('value', 'key')
			->toArray();

		return array_merge(self::$DEFAULT_SETTINGS, $settings);
	}

	public static function setSetting($userId, $key, $value)
	{
		return self::updateOrCreate(
			['user_id' => $userId, 'key' => $key],
			['value' => $value]
		);
	}

	public static function deleteSettingByKey($userId, $key)
	{
		return self::where('user_id', $userId)
			->where('key', $key)
			->delete();
	}

	public static function getSettingByKey($userId, $key)
	{
		$settings = self::where('user_id', $userId)
			->where('key', $key)
			->value('value');
		return $settings ?? self::$DEFAULT_SETTINGS[$key] ?? null;
	}
}
